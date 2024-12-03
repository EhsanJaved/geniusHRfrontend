import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import axios from "axios";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const MeetingCalendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      setLoading(true); // Set loading state to true while fetching
      const [meetingsRes, applicationsRes] = await Promise.all([
        axios.get("http://127.0.0.1:8000/meet/api/meetings/", {
          headers: { Authorization: `Token ${token}` },
        }),
        axios.get("http://127.0.0.1:8000/appli/my-applications/", {
          headers: { Authorization: `Token ${token}` },
        }),
      ]);

      // Meetings data transformation
      const meetings = meetingsRes.data.map((meeting) => ({
        title: meeting.title,
        start: new Date(`${meeting.date}T${meeting.time}`),
        end: new Date(new Date(`${meeting.date}T${meeting.time}`).getTime() + 60 * 60 * 1000), // Assuming a 1-hour meeting duration
        details: {
          location: meeting.location,
          status: meeting.status,
          members: meeting.members.map((member) => member.username).join(", "),
        },
      }));

      // Approved applications data transformation
      const approvedApplications = applicationsRes.data
      .filter((app) => app.status === "approved") // Filter approved applications
      .map((application) => {
        const details = application.details;
        let startDate = new Date(details.start_date || details.expected_joining_date || details.termination_date || details.resignation_date);
        let endDate = new Date(details.end_date || details.termination_date || details.resignation_date);
    
        // Handle different application types
        if ([3, 4, 5, 6, 7, 8, 9, 10, 11].includes(application.application_type)) {
          // For leave applications (Sick, Annual, Casual), use start_date and end_date if provided
          if (details.start_date && details.end_date) {
            startDate = new Date(details.start_date);
            endDate = new Date(details.end_date);
          }
          
          // For termination or resignation applications, set dates accordingly
          if (application.application_type === 7 || application.application_type === 9) {
            // Termination/Resignation - use termination_date or resignation_date as end date
            endDate = new Date(details.termination_date || details.resignation_date);
          }
        }
    
        return {
          title: `Application - ${details.reason || details.position || "No Reason Provided"}`,
          start: startDate,
          end: endDate,
          details: application.details,
        };
      });

      console.log(approvedApplications);
      setEvents([...meetings, ...approvedApplications]);
      setLoading(false); // Set loading state to false after fetching is complete
    } catch (error) {
      console.error("Error fetching data", error);
      setLoading(false); // Set loading state to false if there is an error
    }
  };
  
  useEffect(() => {
    fetchData();
    
    
    console.log(events);
    // Optional: Poll the server for new data every 60 seconds
    const interval = setInterval(fetchData, 60000); // 60 seconds interval
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []); // Empty dependency array means this runs once when the component mounts

  const eventPropGetter = (event) => {
    const backgroundColor = event.title.includes("Meeting") ? "#f6c23e" : "#4e73df";
    return { style: { backgroundColor, color: "white" } };
  };

  const onSelectEvent = (event) => {
    alert(JSON.stringify(event.details, null, 2));
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state while data is being fetched
  }

  return (
    <div style={{ height: "500px", margin: "20px" }}>
      <Calendar
      className="rounded shadow-lg overflow-hidden"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        eventPropGetter={eventPropGetter}
        onSelectEvent={onSelectEvent}
      />
    </div>
  );
};

export default MeetingCalendar;

// Calendar.js
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarStyles.css'; // Custom CSS for Tailwind customization

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  // Sample events data for meetings and leaves
  const [events] = useState([
    {
      title: 'Design Conference',
      start: new Date(2024, 9, 3),
      end: new Date(2024, 9, 4),
      type: 'meeting',
    },
    {
      title: 'Weekend Festival',
      start: new Date(2024, 9, 16),
      end: new Date(2024, 9, 17),
      type: 'leave',
    },
    {
      title: 'Eid-ul-fitr',
      start: new Date(2024, 9, 20),
      end: new Date(2024, 9, 21),
      type: 'leave',
    },
  ]);

  // Custom styling for each event based on type
  const eventStyleGetter = (event) => {
    let bgColor = event.type === 'meeting' ? 'bg-purple-300' : 'bg-orange-300';
    return {
      className: `text-sm rounded-lg p-1 ${bgColor} text-black`,
    };
  };

  return (<>
    <h1 className="text-3xl font-bold pl-8 pb-4 selected-efect-3d">Calendar</h1>
    <div className="p-4">
  
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={['month']}
        eventPropGetter={eventStyleGetter}
        components={{
          toolbar: (props) => (
            <div className="flex justify-between items-center mb-4">
              <button onClick={() => props.onNavigate('PREV')}>{"<"}</button>
              <span className="font-bold">{moment(props.date).format('MMMM YYYY')}</span>
              <button onClick={() => props.onNavigate('NEXT')}>{">"}</button>
            </div>
          ),
        }}
      />
    </div>
    </>
  );
};

export default CalendarPage;

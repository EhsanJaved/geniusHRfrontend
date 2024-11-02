import message from '../../assets/message.svg';
import calendar from '../../assets/calendar.svg';
import dashboard from '../../assets/dashboard.svg';
import employee from '../../assets/employee.svg';
import meeting from '../../assets/meeting.svg';
import payroll from '../../assets/payroll.svg';
import job from '../../assets/job.svg';
import userClock from '../../assets/user-clock-solid.svg';

export const menuItemsForAdmin = [
    { name: 'Dashboard', icon: dashboard, link: '/dashboard' },
    { name: 'Departments', icon: employee, link: '/dashboard/department' },
    { name: 'Message', icon: message, link: '/dashboard/messages' },
    { name: 'Employees', icon: employee, link: '/dashboard/employees' },
    { name: 'Candidates', icon: employee, link: '/dashboard/candidates' },
    { name: 'Jobs', icon: job, link: '/dashboard/jobs' },
    { name: 'Payroll', icon: payroll, link: '/dashboard/payroll' },
];

export const menuItemsForHRAdmin = [
    { name: 'Dashboard', icon: dashboard, link: '/dashboard' },
    { name: 'Message', icon: message, link: '/dashboard/messages' },
    { name: 'Meeting', icon: meeting, link: '/dashboard/meeting' },
    { name: 'Calendar', icon: calendar, link: '/dashboard/calendar' },
    { name: 'Candidates', icon: employee, link: '/dashboard/candidates' },
    { name: 'Employees', icon: employee, link: '/dashboard/employees' },
    { name: 'Jobs', icon: job, link: '/dashboard/jobs' },
    { name: 'Payroll', icon: payroll, link: '/dashboard/payroll' },
];

export const menuItemsForEmployees = [
    { name: 'Dashboard', icon: dashboard, link: '/dashboard' },
    { name: 'Attendance', icon: userClock, link: '/dashboard/attendance' },
    { name: 'Message', icon: message, link: '/dashboard/messages' },
    { name: 'Calendar', icon: calendar, link: '/dashboard/calendar' },
    { name: 'Payroll', icon: payroll, link: '/dashboard/payroll' },
];
export const menuItemsForManager = [
    { name: 'Dashboard', icon: dashboard, link: '/dashboard' },
    { name: 'Attendance', icon: userClock, link: '/dashboard/attendance' },
    { name: 'Message', icon: message, link: '/dashboard/messages' },
    { name: 'Meeting', icon: meeting, link: '/dashboard/meeting' },
    { name: 'Calendar', icon: calendar, link: '/dashboard/calendar' },
    { name: 'Payroll', icon: payroll, link: '/dashboard/payroll' },
];

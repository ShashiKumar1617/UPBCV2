import React from "react";
import "./KasperCalendar.css"; // Import the updated CSS file

const KasperCalendar = ({ holidays, year, month }) => {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const generateDays = () => {
    const days = [];
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // Day of the week for the 1st day
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Total days in the month
    const today = new Date(); // Current date
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // Add empty slots for days before the 1st day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty" />);
    }

    // Add days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      const isHoliday = holidays.find(
        (holiday) =>
          holiday.holidayYear === year &&
          holiday.holidayMonth === month + 1 &&
          holiday.holidayDate === day
      );

      const isCurrentDay = 
        day === currentDay &&
        month === currentMonth &&
        year === currentYear;

      days.push(
        <div
          key={day}
          style={{borderBottom : isHoliday ? "3px solid rgba(206, 10, 10, 0.872)" : "none"}}
          className={`calendar-day ${isCurrentDay ? "current" : ""}`}
          title={isHoliday ? `${isHoliday.holidayName} - ${isHoliday.holidayType}` : ""}
        >
          <span>{day}</span>

        </div>
      );
    }

    return days;
  };

  return (
    <div>
      <div className="calendar-header">
        {dayNames.map((day, index) => (
          <div  key={index} className="calendar-day">
            {day}
          </div>
        ))}
      </div>
      <div className="calendar-container">
        {generateDays()}
      </div>
    </div>
  );
};

export default KasperCalendar;

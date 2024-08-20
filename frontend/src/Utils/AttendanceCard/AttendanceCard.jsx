import React, { useState, useEffect } from "react";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5"; // Import moon icon
import "./AttendanceCard.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const AttendanceCard = () => {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // Split the time string into time and AM/PM parts
  const [time, period] = currentTime.split(" ");

  // Determine whether it's evening (6 PM or later)
  const isEvening = new Date().getHours() >= 18;

  return (
    <div
      className="p-2 rounded-2 background justify-content-between d-flex flex-column"
      style={{ height: "17rem" }}
    >
      <div className="d-flex  align-items-center justify-content-between px-2">
        <div className="d-flex flex-column gap-3 p-2">
          {isEvening ? (
            <IoMoonOutline style={{ fontSize: "5rem" }} />
          ) : (
            <IoSunnyOutline className="rotate" style={{ fontSize: "5rem" }} />
          )}
          <span>{currentDate}</span>
        </div>
        <div className="d-flex align-items-center  gap-2">
          <div className="d-flex flex-column">
            <span style={{ fontSize: "1.9rem" }}>{time}</span>
            <span style={{ fontSize: ".9rem" }}>Real time insight</span>
          </div>
          <div
            className="d-flex flex-column rounded-1"
            style={{ overflow: "hidden", fontSize: "1rem" }}
          >
            <span className="py-1 px-3" style={{ background: "#b6b0b0" }}>
              {period}
            </span>
            <span className="py-1 px-3 bg-light text-muted">
              {period === "PM" ? "AM" : "PM"}
            </span>
          </div>
        </div>
      </div>

      <Link
        to="/employee/MyAttendance"
        className="btn mx-2 bg-primary text-white"
      >
        View attendance
      </Link>
    </div>
  );
};

export default AttendanceCard;

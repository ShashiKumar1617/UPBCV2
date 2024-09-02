import React, { useEffect, useState } from "react";
import "./LeaveComponentHrDash.css";
import { useTheme } from "../../Context/TheamContext/ThemeContext";
import { IoCalendarClearOutline, IoTimerOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import axios from "axios";
import BASE_URL from "../../Pages/config/config";
import {getFormattedDateWTY } from "../GetDayFormatted";
import { CgArrowLongRightC } from "react-icons/cg";

const LeaveComponentHrDash = () => {
  const { darkMode } = useTheme();
  const [data, SetLeaveData] = useState([]);

  const loadLeaveApplicationHRData = () => {
    axios
      .post(`${BASE_URL}/api/leave-application-hr/`, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        SetLeaveData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadLeaveApplicationHRData();
  }, []);

  const Status = (key) => {
    switch (key) {
      case 3:
        return (
          <span
            className={`${darkMode ? "badge-danger" : "badge-danger-dark"}`}
          >
            Rejected
          </span>
        );

      case 2:
        return (
          <span
            className={`${darkMode ? "badge-success" : "badge-success-dark"}`}
          >
            Approved
          </span>
        );

      default:
        return (
          <span
            className={`${darkMode ? "badge-warning" : "badge-warning-dark"}`}
          >
            Pending
          </span>
        );
    }
  };

  const Icons = (key) => {
    switch (key) {
      case 3:
        return <MdOutlineCancel className="text-danger" />;

      case 2:
        return <IoMdCheckmarkCircleOutline className="text-success" />;
      default:
        return <IoTimerOutline className="tex-danger" />;
    }
  };
  


  return (
    <div
      style={{
        height: "17rem",
        overflow: "hidden",
        color: darkMode ? "black" : "White",
        background: darkMode ? "#F5F5F6" : "#161515f6",
      }}
      className="p-2 px-3 shadow-sm rounded-2 d-flex flex-column gap-2"
    >
      <div className="d-flex align-items-center justify-content-between">
        <h5 className="my-0 fw-normal  d-flex align-items-center gap-2">
          <IoCalendarClearOutline /> Staff on leave
        </h5>
        <span
          style={{
            minHeight: "1.6rem",
            minWidth: "1.6rem",
            background: darkMode ? "#ededf1d4" : "#252424c3",
          }}
          className="d-flex align-items-center justify-content-center"
        >
          See all
        </span>
      </div>
      <hr className="m-1" style={{ opacity: "10%" }} />
      <div className="progress-circle">
        <svg width="150" viewBox="0 0 100 50">
          <path
            d="M 10,50 A 40,40 0 1,1 90,50"
            fill="none"
            stroke="#ddd"
            strokeWidth="14"
          />
          <path
            d="M 10,50 A 40,40 0 1,1 90,50"
            fill="none"
            stroke="#3939FF"
            strokeWidth="15"
            strokeDasharray="125.6"
            strokeDashoffset={125.6 - (125.6 * 34) / 34}
          />
        </svg>
        <div className="leave-count d-flex flex-column gap-0">
          <h6>16</h6>
          <span>OUT OF 34</span>
        </div>
      </div>
      <hr className="m-1" style={{ opacity: "10%" }} />
{data.length >= 0 ? (      <div className="leave-list">
        {data
          .slice(-2)
          .reverse().filter((leave) => new Date(leave.ToDate) > new Date())  
          .map((leave, index) => (
            <div key={index} className="d-flex align-items-center gap-2">
              
              <span className="d-flex align-items-center gap-2">
              <span>{Icons(leave.status)}</span><span>{getFormattedDateWTY(leave.FromDate)}</span> <CgArrowLongRightC className="fs-5 my-auto text-success" /> <span>{getFormattedDateWTY(leave.ToDate)}</span> 
              </span>
              <span className="text-capitalize ms-auto">{leave.FirstName} {leave.LastName}</span>
              <span className="ms-auto">{leave.Leavetype}</span>
              <span className="ms-auto">{Status(leave.status)}</span>
            </div>
          ))}
      </div>) : (<div className="d-flex align-items-center">No New Leave Request <sup className="text-danger fs-6">*</sup></div>) }
    </div>
  );
};

export default LeaveComponentHrDash;

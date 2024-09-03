import React from "react";
import MyTodaysLoginData from "../../Employee/WelcomeBoard/MyTodaysLoginData/MyTodaysLoginData";
import AdminNews from "../../../Utils/AdminNews/AdminNews";
import UpcomingBirthdays from "../../Employee/Dashboard/CountData/UpcomingBirthdays";
import HolidayDash from "../../../Utils/HolidayDash/HolidayDash";
import LeaveComponentHrDash from "../../../Utils/LeaveComponentHrDash/LeaveComponentHrDash";
import EmployeeLeaveDash from "../../../Utils/EmployeeLeaveDash/EmployeeLeaveDash";
import AttendanceCard from "../../../Utils/AttendanceCard/AttendanceCard";
import EmployeeStatus from "../../../Utils/EmployeeStatus/EmployeeStatus";
import './HRDash.css';

const HRDash = () => {
  return (
    <div className="Dash-wrapper container-fluid">
      <div className="dash-item"><MyTodaysLoginData/></div>
      <div className="dash-item"><EmployeeLeaveDash/></div>
      <div className="dash-item"><AdminNews/></div>
      <div className="dash-item"><AttendanceCard/></div>
      <div className="dash-item"><LeaveComponentHrDash/></div>
      <div className="dash-item"><HolidayDash/></div>
      <div className="dash-item"><UpcomingBirthdays/></div>
      <div className="dash-item EmployeeStatus"><EmployeeStatus/></div>
    </div>
  );
};

export default HRDash;

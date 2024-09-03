import React from "react";
import TeamManager from "../../../Utils/Teams/TeamManager/TeamManager";
import AdminNews from "../../../Utils/AdminNews/AdminNews";
import UpcomingBirthdays from "../../Employee/Dashboard/CountData/UpcomingBirthdays";
import HolidayDash from "../../../Utils/HolidayDash/HolidayDash";
import AttendanceCard from "../../../Utils/AttendanceCard/AttendanceCard";
import TaskCompletionCard from "../../../Utils/TaskCompletionCard/TaskCompletionCard";
import LeaveComponentHrDash from "../../../Utils/LeaveComponentHrDash/LeaveComponentHrDash";
import EmployeeStatus from "../../../Utils/EmployeeStatus/EmployeeStatus";
import "./AdminDash.css"
import MyTeamList from "../../../Pages/MyTeams/MyTeamList";

const AdminDash = () => {
  return (
    <div className="Dash-wrapper container-fluid">
      <div className="dash-item"><TaskCompletionCard /></div>
      <div className="dash-item"><MyTeamList /></div>
      <div className="dash-item"><AdminNews/></div>
      <div className="dash-item"><AttendanceCard/></div>
      <div className="dash-item"><LeaveComponentHrDash/></div>
      <div className="dash-item"><HolidayDash/></div>
      <div className="dash-item"><UpcomingBirthdays/></div>
      <div className="dash-item EmployeeStatus"><EmployeeStatus/></div>
    </div>
  );
};

export default AdminDash;

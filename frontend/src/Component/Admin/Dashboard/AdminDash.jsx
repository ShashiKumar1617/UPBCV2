import React from "react";
import MyTodaysLoginData from "../../Employee/WelcomeBoard/MyTodaysLoginData/MyTodaysLoginData";
import TeamManager from "../../../Utils/Teams/TeamManager/TeamManager";
import AdminNews from "../../../Utils/AdminNews/AdminNews";
import UpcomingBirthdays from "../../Employee/Dashboard/CountData/UpcomingBirthdays";
import HolidayDash from "../../../Utils/HolidayDash/HolidayDash";
import EmployeeLogCount from "../../../Pages/Chart/EmployeeLogCount";
import DailyAttendChart from "../../../Pages/Chart/DailyAttendChart";
import DepartmentChart from "../../../Pages/Chart/DepartmentChart";
import AttendanceCard from "../../../Utils/AttendanceCard/AttendanceCard";
import EmployeeCounts from "../../../Utils/EmployeeCounts/EmployeeCounts";
import TaskCompletionCard from "../../../Utils/TaskCompletionCard/TaskCompletionCard";

const AdminDash = () => {
  const displayComponents = [
    { compName: <TaskCompletionCard /> },
    { compName: <MyTodaysLoginData /> },
    { compName: <EmployeeCounts /> },
    { compName: <TeamManager /> },
    { compName: <AdminNews /> },
    { compName: <AttendanceCard /> },
    { compName: <UpcomingBirthdays /> },
    { compName: <HolidayDash /> },
    { compName: <EmployeeLogCount /> },
    { compName: <DailyAttendChart /> },
    { compName: <DepartmentChart /> },
  ];

  return (
    <div className="container-fluid py-0 pb-4">
      <div className="row justify-content-between align-items-center">
        {displayComponents.map((Comp, index) => (
          <div key={index} className="col-6 col-md-4 p-2">
            <div>{Comp.compName}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDash;

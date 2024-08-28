import React from "react";
import DepartmentChart from "../../../Pages/Chart/DepartmentChart";
import DailyAttendChart from "../../../Pages/Chart/DailyAttendChart";
import EmployeeLogCount from "../../../Pages/Chart/EmployeeLogCount";
import TaskChart from "./Chart/TaskChart";
import MyTodaysLoginData from "../../Employee/WelcomeBoard/MyTodaysLoginData/MyTodaysLoginData";
import TeamManager from "../../../Utils/Teams/TeamManager/TeamManager";
import UpcomingBirthdays from "../../Employee/Dashboard/CountData/UpcomingBirthdays";
import AdminNews from "../../../Utils/AdminNews/AdminNews";
import HolidayDash from "../../../Utils/HolidayDash/HolidayDash";
import AttendanceCard from "../../../Utils/AttendanceCard/AttendanceCard";

const ManagerDash = () => {
  const displayComponents = [
    { compName: <MyTodaysLoginData /> },
    { compName: <TeamManager /> },
    { compName: <AdminNews /> },
    { compName: <AttendanceCard /> },
    { compName: <UpcomingBirthdays /> },
    { compName: <HolidayDash /> },
    { compName: <EmployeeLogCount /> },
    { compName: <DailyAttendChart /> },
    { compName: <DepartmentChart /> },
    { compName: <TaskChart /> },
  ];

  return (
    <div className="container-fluid py-2 pb-4">
      <div className="row align-items-center">
        {displayComponents.map((Comp, index) => (
          <div key={index} className="col-6 col-md-4 p-2">
            <div>{Comp.compName}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagerDash;

// HrDash.jsx
import React from "react";
import MyTodaysLoginData from "../WelcomeBoard/MyTodaysLoginData/MyTodaysLoginData";
import AdminNews from "../../../Utils/AdminNews/AdminNews";
import AttendanceCard from "../../../Utils/AttendanceCard/AttendanceCard";
import UpcomingBirthdays from "./CountData/UpcomingBirthdays";
import HolidayDash from "../../../Utils/HolidayDash/HolidayDash";
import TeamManager from "../../../Utils/Teams/TeamManager/TeamManager";
import EmployeeLeaveDash from "../../../Utils/EmployeeLeaveDash/EmployeeLeaveDash";
import TaskDash from "../../../Utils/TaskDash/TaskDash";

const HrDash = () => {
  const displayComponents = [
    {
      component: <MyTodaysLoginData />,
      display: "col-12 col-md-6 col-lg-4 p-2",
    },
    {
      component: <EmployeeLeaveDash />,
      display: "col-12 col-md-6 col-lg-4 p-2",
    },
    { component: <AdminNews />, display: "col-12 col-md-6 col-lg-4 p-2" },
    { component: <AttendanceCard />, display: "col-12 col-md-6 col-lg-4 p-2" },
    { component: <TaskDash />, display: "col-12 col-md-6 col-lg-4 p-2" },
    {
      component: <UpcomingBirthdays />,
      display: "col-12 col-md-4 col-md-3 p-2",
    },
    { component: <HolidayDash />, display: "col-12 col-md-6 col-lg-4 p-2" },
    { component: <TeamManager />, display: "col-12 col-md-6 col-lg-4 p-2" },
  ];

  return (
    <div className="container-fluid py-2 pb-4">
      <div className="row align-items-center">
        {displayComponents.map(({ component, display }, index) => (
          <div key={index} className={display}>
            {component}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HrDash;

import React from "react";
import MyTodaysLoginData from "../../Employee/WelcomeBoard/MyTodaysLoginData/MyTodaysLoginData";
import TeamManager from "../../../Utils/Teams/TeamManager/TeamManager";
import AdminNews from "../../../Utils/AdminNews/AdminNews";
import UpcomingBirthdays from "../../Employee/Dashboard/CountData/UpcomingBirthdays";
import HolidayDash from "../../../Utils/HolidayDash/HolidayDash";
import EmployeeLogCount from "../../../Pages/Chart/EmployeeLogCount";
import DailyAttendChart from "../../../Pages/Chart/DailyAttendChart";
import DepartmentChart from "../../../Pages/Chart/DepartmentChart";
import LeaveComponentHrDash from "../../../Utils/LeaveComponentHrDash/LeaveComponentHrDash";

const HRDash = () => {
  const displayComponents = [
    {
      component: <MyTodaysLoginData />,
      display: "col-12 col-md-4 col-lg-4 p-2",
    },
    { component: <TeamManager />, display: "col-12 col-md-4 col-lg-4 p-2" },
    { component: <AdminNews />, display: "col-12 col-md-4 col-lg-4 p-2" },
    {
      component: <UpcomingBirthdays />,
      display: "col-12 col-md-4 col-lg-4 p-2",
    },
    {
      component: <LeaveComponentHrDash />,
      display: "col-12 col-md-4 col-lg-3 p-2",
    },
    { component: <HolidayDash />, display: "col-12 col-md-4 col-lg-5 p-2" },

    {
      component: <EmployeeLogCount />,
      display: "col-12 col-md-4 col-lg-4 p-2",
    },
    {
      component: <DailyAttendChart />,
      display: "col-12 col-md-4 col-lg-4 p-2",
    },
    { component: <DepartmentChart />, display: "col-12 col-md-4 col-lg-4 p-2" },
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

export default HRDash;

import React from "react";
import "./EmpDash.css";
import EmpTaskChart from "./EmpChart.jsx/EmpTaskChart";
import WelcomeBoard from "../../../Pages/WelcomeBoard/WelcomeBoard";
import MyTodaysLoginData from "../WelcomeBoard/MyTodaysLoginData/MyTodaysLoginData";
import TittleHeader from "../../../Pages/TittleHeader/TittleHeader";
import AttendanceDetails from "../attendance/AttendanceDetails";
import AttendanceCard from "../../../Utils/AttendanceCard/AttendanceCard";
import EmployeeLeaveDash from "../../../Utils/EmployeeLeaveDash/EmployeeLeaveDash";
import AdminNews from "../../../Utils/AdminNews/AdminNews";
import TaskDash from "../../../Utils/TaskDash/TaskDash";
import UpcomingBirthdays from "./CountData/UpcomingBirthdays";
import HolidayDash from "../../../Utils/HolidayDash/HolidayDash";
import TeamManager from "../../../Utils/Teams/TeamManager/TeamManager";

const HRDash = () => {
  return (
    <div className="container-fluid py-2 ">
      <div className="row justif-content-between row-gap-2 align-items-center">
        <div className="col-12 col-md-6 col-lg-4">
          <MyTodaysLoginData />
        </div>
        <div className="col-12 col-lg-4">
          <EmployeeLeaveDash />
        </div>
        <div className="col-12 col-lg-4">
          <AdminNews />
        </div>
        <div className="col-12 col-lg-4">
          <AttendanceCard />
        </div>
        <div className="col-12 col-lg-8">
          {/* <AttendanceDetails /> */}

          <TaskDash />
        </div>
        <div className="col-12 col-lg-4">
          {" "}
          <UpcomingBirthdays />
        </div>
        <div className="col-12 col-lg-4">
          {" "}
          <HolidayDash />
        </div>
        <div className="col-12 col-lg-4">
          {" "}
          <TeamManager />
        </div>
      </div>
      <div className="row justif-content-between row-gap-4 mt-3 align-items-center">
        <div className="col-12">{/* <EmpTaskChart /> */}</div>
      </div>
    </div>
  );
};

export default HRDash;

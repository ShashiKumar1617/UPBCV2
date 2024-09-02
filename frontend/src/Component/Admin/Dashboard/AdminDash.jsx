import React from "react";
import TeamManager from "../../../Utils/Teams/TeamManager/TeamManager";
import AdminNews from "../../../Utils/AdminNews/AdminNews";
import UpcomingBirthdays from "../../Employee/Dashboard/CountData/UpcomingBirthdays";
import HolidayDash from "../../../Utils/HolidayDash/HolidayDash";
import AttendanceCard from "../../../Utils/AttendanceCard/AttendanceCard";
import EmployeeCounts from "../../../Utils/EmployeeCounts/EmployeeCounts";
import TaskCompletionCard from "../../../Utils/TaskCompletionCard/TaskCompletionCard";
import LeaveComponentHrDash from "../../../Utils/LeaveComponentHrDash/LeaveComponentHrDash";
import EmployeeStatus from "../../../Utils/EmployeeStatus/EmployeeStatus";

const AdminDash = () => {
  const displayComponents = [
    { compName: <TaskCompletionCard /> },
    { compName: <AdminNews/> },
    { compName: <HolidayDash /> },
    { compName: <EmployeeCounts /> },
    { compName: <AttendanceCard /> },
    { compName: <LeaveComponentHrDash /> },
    { compName: <TeamManager /> },
    { compName: <UpcomingBirthdays /> },
    { compName: <EmployeeStatus/> },
  ];

  return (
    <div className="container-fluid py-0">
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

export default AdminDash;

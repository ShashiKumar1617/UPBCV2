import React, { useEffect, useState } from "react";
import { useTheme } from "../../Context/TheamContext/ThemeContext";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { IoAirplaneOutline } from "react-icons/io5";

const EmployeeLeaveDash = () => {
  const [leaveBalance, setLeaveBalance] = useState([]);
  const id = localStorage.getItem("_id");
  const { darkMode } = useTheme();

  useEffect(() => {
    axios
      .post("http://localhost:4000/api/getLeave", { id })
      .then((response) => {
        const formattedData = response.data.map((item) => {
          const leaveType = Object.keys(item)[0];
          const totalLeaveType = Object.keys(item)[1];
          return {
            leaveType: leaveType.replace(/([A-Z])/g, " $1").trim(),
            balance: item[leaveType],
            totalBalance: item[totalLeaveType],
            leaveTaken: item[totalLeaveType] - item[leaveType],
          };
        });
        setLeaveBalance(formattedData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
      <h5 className="my-0 fw-normal  d-flex align-items-center gap-2">
        <IoAirplaneOutline className="fs-4" /> Leave
      </h5>
      <div
        style={{ height: "calc(100% - 5rem)", overflow: "auto " }}
        className="px-3"
      >
        {leaveBalance.map((leave, index) => (
          <div key={index} className="mb-2 ">
            <h6>{leave.leaveType}</h6>
            <div className="d-flex justify-content-between px-3">
              <div className="d-flex">
                Total:{" "}
                <span className="text-primary mx-2">{leave.totalBalance}</span>
              </div>
              <div>
                Taken:{" "}
                <span className="text-primary mx-2">{leave.leaveTaken}</span>
              </div>
              <div>
                Balance:{" "}
                <span className="text-primary mx-2">{leave.balance}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link
        to={`/employee/${id}/leave-application-emp`}
        className="btn bg-primary rounded-2 text-white w-100"
      >
        Apply Leave
      </Link>
    </div>
  );
};

export default EmployeeLeaveDash;

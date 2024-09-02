import React, { useEffect, useState } from "react";
import { useTheme } from "../../Context/TheamContext/ThemeContext";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { IoAirplaneOutline, IoTimerOutline } from "react-icons/io5";
import { LiaCapsulesSolid } from "react-icons/lia";
import { BsCurrencyRupee } from "react-icons/bs";
import { MdBabyChangingStation } from "react-icons/md";
import { useDispatch, } from "react-redux";
import { fetchPersonalInfo } from "../../Redux/Slices/personalInfoSlice";

const EmployeeLeaveDash = () => {
  const [leaveBalance, setLeaveBalance] = useState([]);
  const id = localStorage.getItem("_id");
  const { darkMode } = useTheme();

  const dispatch = useDispatch();

  useEffect(() => {
    const employeeId = localStorage.getItem("_id");
    dispatch(fetchPersonalInfo(employeeId));
  }, [dispatch]);

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

  const setIcons = (key) => {
    switch (key) {
      case "paid Leave":
        return (
          <span
            style={{
              height: "1.3rem",
              width: "1.3rem",
              borderRadius: "50%",
              background: "#8ff18031",
              color: "#3ab927",
            }}
            className="d-flex  align-items-center justify-content-center"
          >
            <BsCurrencyRupee className="fs-6" />
          </span>
        );
      case "casual Leave":
        return (
          <span
            style={{
              height: "1.3rem",
              width: "1.3rem",
              borderRadius: "50%",
              background: "#ff5f3f2f",
              color: "#ff5f3f",
            }}
            className="d-flex  align-items-center justify-content-center"
          >
            <IoTimerOutline className="fs-5" />
          </span>
        );
      case "paternity Leave":
        return (
          <span
            style={{
              height: "1.3rem",
              width: "1.3rem",
              borderRadius: "50%",
              background: "#423fff2e",
              color: "#423fff",
            }}
            className="d-flex  align-items-center justify-content-center"
          >
            <MdBabyChangingStation className="fs-5" />
          </span>
        );
      case "maternity Leave":
        return (
          <span
            style={{
              height: "1.3rem",
              width: "1.3rem",
              borderRadius: "50%",
              background: "#423fff51",
              color: "#423fff",
            }}
            className="d-flex  align-items-center justify-content-center"
          >
            <MdBabyChangingStation className="fs-5" />
          </span>
        );

      default:
        return (
          <span
            style={{
              height: "1.3rem",
              width: "1.3rem",
              borderRadius: "50%",
              background: "#f3bf5d33",
              color: "#b37c16",
            }}
            className="d-flex  align-items-center justify-content-center"
          >
            <LiaCapsulesSolid />
          </span>
        );
    }
  };

  const removeLeaveText = (text) => {
    return text.replace(/Leave|leave/g, "").trim();
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
      <h5 className="my-0 fw-normal  d-flex align-items-center gap-2">
        <IoAirplaneOutline className="fs-4" /> Leave
      </h5>
      <div
        style={{ height: "calc(100% - 5rem)", overflow: "auto " }}
        className="row mx-auto row-gap-2 pt-2"
      >
        {leaveBalance.map((leave, index) => (
          <div key={index} className="col-12 col-md-6 h-50">
            <div
              style={{
                background: !darkMode ? "black" : "white",
                color: !darkMode ? "white" : "black",
              }}
              className="py-2 px-2 shadow-sm rounded-2"
            >
              <h6 className="d-flex align-items-center text-capitalize gap-2">
                {removeLeaveText(leave.leaveType)}{" "}
                <span>{setIcons(leave.leaveType)} </span>
              </h6>

              <div className="d-flex align-items-center justify-content-between gap-2">
                {" "}
                <div>
                  Balance:{" "}
                  <span className="text-primary mx-2 text-success fw-bold">
                    {leave.balance}
                  </span>
                </div>
                <span style={{ color: "#dadada" }}>|</span>
                <div>
                  Taken:{" "}
                  <span className="text-primary mx-2 text-danger  fw-bold">
                    {leave.leaveTaken}
                  </span>
                </div>
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

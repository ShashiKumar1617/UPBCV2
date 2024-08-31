import React, { useEffect, useState } from "react";
import { MdOutlineWorkHistory, MdWorkHistory } from "react-icons/md";

import axios from "axios";
import BASE_URL from "../../../../Pages/config/config";
import { useTheme } from "../../../../Context/TheamContext/ThemeContext";
import { FiCoffee } from "react-icons/fi";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
const MyTodaysLoginData = (props) => {
  const [attendanceData, setAttendanceData] = useState(null);
  const [empName, setEmpName] = useState(null);
  const { darkMode } = useTheme();

  const employeeId = localStorage.getItem("_id");

  useEffect(() => {
    const loadPersonalInfoData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/personal-info/` + employeeId,
          {
            headers: {
              authorization: localStorage.getItem("token") || "",
            },
          }
        );
        setEmpName(response.data.FirstName);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    loadPersonalInfoData();
  }, []);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        // Fetch today's attendance data for the employee
        const response = await fetch(
          `${BASE_URL}/api/employee/${employeeId}/today-attendance`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch attendance data");
        }
        const data = await response.json();
        setAttendanceData(data);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    fetchAttendanceData();
  }, [employeeId]);

  if (!attendanceData) {
    return <div>Loading...</div>;
  }
  function convertMinutesToHoursAndMinutes(minutes) {
    var hours = Math.floor(minutes / 60);
    var remainingMinutes = minutes % 60;

    return hours + " h " + remainingMinutes + " min";
  }

  const labelData = [
    {
      icon: <IoLogInOutline className="text-success fs-5" />,
      iconBG: "#abf9a728",
      title: "Today's login time",
      data: attendanceData.loginTime ? attendanceData.loginTime : "--",
    },
    {
      icon: <IoLogOutOutline className="text-danger fs-5" />,
      iconBG: "#ff8e8621",
      title: "Today's logout time",
      data: attendanceData.logoutTime ? attendanceData.logoutTime : "--",
    },
    {
      icon: <FiCoffee className="text-warning fs-5" />,
      iconBG: "#fbff8021",
      title: "Total break taken",
      data: convertMinutesToHoursAndMinutes(attendanceData.totalBrake),
    },
    {
      icon: <MdOutlineWorkHistory className="text-primary fs-5" />,
      iconBG: "#deccfa2b",
      title: "Total login time",
      data: convertMinutesToHoursAndMinutes(attendanceData.totalLoginTime),
    },
  ];

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
      {" "}
      <h5 className="my-0 fw-normal  d-flex align-items-center gap-2">
        My Todays Overview
      </h5>
      <div
        style={{
          width: "100%",
          height: "14rem",
          color: darkMode ? "black" : "White",
          background: darkMode ? "#F5F5F6" : "#161515f6",
        }}
        className="d-flex flex-wrap shadow-sm rounded-2 align-items-center justify-content-evenly"
      >
        {labelData.map((item, index) => (
          <Labels
            style={{
              background: darkMode
                ? "var(--primaryDashMenuColor)"
                : "var(--primaryDashColorDark)",
              height: "fit-content",
              border: darkMode ? "1px solid #1f1e1e46" : "1px solid #f5f5f693",
              width: "45%",
            }}
            TytleStyle={"d-flex align-items-center justify-content-between p-2"}
            baseStyle={{
              border: darkMode ? "1px solid #1f1e1e46" : "1px solid #f5f5f693",
            }}
            key={index}
            icon={item.icon}
            title={item.title}
            data={item.data}
            background={item.iconBG}
          />
        ))}
      </div>
    </div>
  );
};

export default MyTodaysLoginData;

const Labels = ({
  title,
  data,
  icon,
  style,
  TytleStyle,
  background,
  baseStyle,
}) => {
  return (
    <div className="my-0 p-0 rounded-3" style={style}>
      <h4 className="my-1 text-center  fw-normal">{data}</h4>
      <div style={baseStyle} className="my-auto shadow rounded-3">
        <span className={TytleStyle}>
          {title}
          <span
            style={{
              height: "35px",
              width: "35px",
              borderRadius: "50%",
              background: background,
            }}
            className="d-flex align-items-center justify-content-center"
          >
            {icon}
          </span>
        </span>
      </div>
    </div>
  );
};

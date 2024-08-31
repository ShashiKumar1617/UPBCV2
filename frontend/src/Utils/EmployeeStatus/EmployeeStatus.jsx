import React, { useEffect, useState } from "react";
import { useTheme } from "../../Context/TheamContext/ThemeContext";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { LuUserMinus } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { fetchAttendanceData } from "../../Redux/Slices/attendanceSlice";
import { IoIosArrowDown } from "react-icons/io";

const EmployeeStatus = () => {
  const { darkMode } = useTheme();

  const dispatch = useDispatch();
  const { attendanceData, status } = useSelector((state) => state.attendance);

  const [showAllAbsent, setShowAllAbsent] = useState(false);
  const [showAllHalday, setShowAllHalday] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAttendanceData());
    }
  }, [status, dispatch]);

  const handleToggleShowAllAbsent = () => {
    setShowAllAbsent((prevState) => !prevState);
  };

  const handleToggleShowAllHalfday = () => {
    setShowAllHalday((prevState) => !prevState);
  };

  const displayedData = showAllAbsent ? attendanceData : attendanceData.slice(0, 2);

  const getAttendanceMark = (user) => {
    if (!user || !user.attendance) {
      return "Absent";
    }

    const loginTime = user.attendance.loginTime && user.attendance.loginTime[0];

    if (typeof loginTime !== "string") {
      return "Absent";
    }

    const [loginHour, loginMinute] = loginTime.split(":").map(Number);

    if (isNaN(loginHour) || isNaN(loginMinute)) {
      return "Absent";
    }

    if (loginHour > 9 || (loginHour === 9 && loginMinute > 45)) {
      return "Half Day";
    } else if (loginHour === 9 && loginMinute > 30) {
      return "Late";
    }

    return "Present";
  };

  const FilteredHalday = attendanceData.filter((attn) => {
    const loginTime = attn?.attendance?.loginTime[0];
    if (!loginTime || loginTime === "WO" || attn?.attendance === null) {
      return true;
    }

    const [hours, minutes] = loginTime.split(":").map(Number);
    return hours > 9 || (hours === 9 && minutes > 30);
  });

  return (
    <div
      style={{
        height: "34rem",
        overflow: "hidden",
        color: darkMode ? "black" : "white",
        background: darkMode ? "#F5F5F6" : "#161515f6",
      }}
      className="p-2 px-3 shadow-sm rounded-2 d-flex flex-column gap-2"
    >
      <div className="d-flex align-items-center justify-content-between">
        <h5 className="my-0 fw-normal d-flex align-items-center gap-2">
          <AiOutlineUser /> Employee Status
        </h5>
        <span className="py-1 px-2 bg-white rounded-5">
          See All <MdOutlineArrowForwardIos />
        </span>
      </div>
      <div style={{ height: "30rem", overflow: "auto" }}>
      <hr className="m-0 my-2" style={{border:'1px solid rgba(0,0,0,.3)'}} />
        <div className="bg-white p-2 px-3 rounded-3 shadow-sm">
          <h6>Absent</h6>
          <div className="d-flex flex-column gap-2">
            {displayedData
              .filter(
                (attn) =>
                  attn?.attendance?.loginTime[0] === "" ||
                  attn?.attendance?.loginTime[0] === "WO" ||
                  attn?.attendance === null
              )
              .map((attn, index) => (
                <div key={index} className="d-flex align-items-center">
                  <div className="d-flex align-items-center gap-2">
                    <div
                      style={{
                        height: "30px",
                        width: "30px",
                        borderRadius: "50%",
                      }}
                    >
                      <img
                        style={{
                          height: "100%",
                          width: "100%",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                        src={
                          attn?.profile?.image_url
                            ? attn?.profile?.image_url
                            : "https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1724976000&semt=ais_hybrid"
                        }
                        alt=""
                      />
                    </div>
                    <div className="d-flex flex-column text-capitalize">
                      <p className=" m-0">
                        {attn?.FirstName} {attn?.LastName}
                      </p>
                      <p className=" m-0">{attn?.department?.DepartmentName}</p>
                    </div>
                  </div>
                  <span
                    className={`${
                      darkMode
                        ? "badge-danger ms-auto py-1"
                        : "badge-danger-dark ms-auto py-1"
                    }`}
                  >
                    <LuUserMinus className="my-auto" />{" "}
                    {attn?.attendance?.loginTime[0]
                      ? getAttendanceMark(attn?.attendance?.loginTime[0])
                      : "Absent"}
                  </span>
                </div>
              ))}
          </div>
          <button
            className="btn py-0 px-2 rounded-0 shadow-sm border my-2 mx-auto"
            onClick={handleToggleShowAllAbsent}
          >
            {showAllAbsent ? "Show Less" : "See All"} <IoIosArrowDown />
          </button>
        </div>
        <hr className="m-0 my-2" style={{border:'1px solid rgba(0,0,0,.3)'}} />
        <div className="bg-white p-2 px-3 rounded-3 shadow-sm">
          <h6>Half day</h6>
          <div className="d-flex flex-column gap-2">
            {FilteredHalday.map((attn, index) => (
              <div key={index} className="d-flex align-items-center">
                <div className="d-flex align-items-center gap-2">
                  <div
                    style={{
                      height: "30px",
                      width: "30px",
                      borderRadius: "50%",
                    }}
                  >
                    <img
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                      src={
                        attn?.profile?.image_url
                          ? attn?.profile?.image_url
                          : "https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1724976000&semt=ais_hybrid"
                      }
                      alt=""
                    />
                  </div>
                  <div className="d-flex flex-column text-capitalize">
                    <p className=" m-0">
                      {attn?.FirstName} {attn?.LastName}
                    </p>
                    <p className=" m-0">{attn?.department?.DepartmentName}</p>
                  </div>
                </div>
                <span
                  className={`${
                    darkMode
                      ? "badge-danger ms-auto py-1"
                      : "badge-danger-dark ms-auto py-1"
                  }`}
                >
                  <LuUserMinus className="my-auto" />{" "}
                  {attn?.attendance?.loginTime[0]
                    ? getAttendanceMark(attn?.attendance?.loginTime[0])
                    : "Absent"}
                </span>
              </div>
            ))}
          </div>
          <button
            className="btn py-0 px-2 rounded-0 shadow-sm border my-2 mx-auto"
            onClick={handleToggleShowAllHalfday}
          >
            {showAllHalday ? "Show Less" : "See All"} <IoIosArrowDown />
          </button>
        </div>
        <hr className="m-0 my-2" style={{border:'1px solid rgba(0,0,0,.3)'}} />
      </div>
    </div>
  );
};

export default EmployeeStatus;

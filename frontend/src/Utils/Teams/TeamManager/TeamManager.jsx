import React, { useEffect, useState } from "react";
import { SiMicrosoftteams } from "react-icons/si";
import { useSelector, useDispatch } from "react-redux";
import { fetchAttendanceData } from "../../../Redux/Slices/attendanceSlice";
import { useTheme } from "../../../Context/TheamContext/ThemeContext";

const TeamManager = () => {
  const dispatch = useDispatch();
  const { attendanceData, status, error } = useSelector(
    (state) => state.attendance
  );

  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const { darkMode } = useTheme();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAttendanceData());
    }
  }, [status, dispatch]);

  const getAttendanceStatus = (loginTime) => {
    if (!loginTime) {
      return (
        <span
          className="text-danger py-1 px-2 rounded-2"
          style={{ background: "#f33d3d22" }}
        >
          Absent
        </span>
      );
    }

    const loginDate = new Date(`1970-01-01T${loginTime}`);
    const nineThirty = new Date("1970-01-01T09:30:00");
    const nineFortyFive = new Date("1970-01-01T09:45:00");
    const threePM = new Date("1970-01-01T15:00:00");

    if (loginDate < nineThirty) {
      return (
        <span
          className="text-success py-1 px-2 rounded-2"
          style={{ background: "#86ed1f3d" }}
        >
          Present
        </span>
      );
    } else if (loginDate >= nineThirty && loginDate <= nineFortyFive) {
      return (
        <span
          className="text-primary py-1 px-2 rounded-2"
          style={{ background: "#1f71ed3d" }}
        >
          Late
        </span>
      );
    } else if (loginDate > nineFortyFive && loginDate <= threePM) {
      return (
        <span
          className="py-1 px-2 rounded-2"
          style={{ background: "#f5550555", color: "#f55505" }}
        >
          Half Day
        </span>
      );
    } else {
      return (
        <span
          className="text-danger py-1 px-2 rounded-2"
          style={{ background: "#f33d3d22" }}
        >
          Absent
        </span>
      );
    }
  };

  const sortedAndFilteredData = attendanceData
    .slice()
    .filter((item) =>
      item.FirstName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortField) {
        const aValue = a[sortField];
        const bValue = b[sortField];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortOrder === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else {
          return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
        }
      }
      return 0;
    });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  const reportingManager = localStorage.getItem("Email");
  const userType = localStorage.getItem("Account");
  console.log(attendanceData);

  return (
    <div
      style={{
        height: "17rem",
        overflow: "hidden",
        background: "#F5F5F6",
      }}
      className="px-3 shadow-sm rounded-2 d-flex flex-column gap-2 justify-content-between pb-3 pt-2"
    >
      <div className="d-flex align-items-center justify-content-between">
        <h5 className="my-0 fw-normal d-flex align-items-center gap-2">
          <SiMicrosoftteams />
          Team
        </h5>{" "}
        <span
          style={{
            minHeight: "1.6rem",
            minWidth: "1.6rem",
            borderRadius: "50%",
          }}
          className="bg-white  d-flex align-items-center justify-content-center"
        >
          {userType >= 1 &&
            userType <= 4 &&
            attendanceData.filter(
              (data) => data.reportManager === reportingManager
            ).length}
        </span>
      </div>
      <div
        className="p-1 bg-white px-3 rounded-3"
        style={{ height: "14rem", overflow: "auto" }}
      >
        {userType == 1 && (
          <div>
            {attendanceData
              .filter((data) => data.reportManager === reportingManager)
              .map((atten, index) => (
                <div
                  key={index}
                  className="d-flex align-items-center justify-content-between my-2"
                >
                  <div className="d-flex align-items-center gap-3">
                    <div
                      style={{
                        height: "2.2rem",
                        width: "2.2rem",
                        borderRadius: "50%",
                        background: "blue",
                      }}
                    >
                      <img
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                        src={atten?.profile?.image_url}
                        alt=""
                      />
                    </div>
                    <div className="text-capitalize">
                      {atten.FirstName} {atten.LastName} <br />
                      {atten.position}
                    </div>
                  </div>

                  <div
                    style={{ fontSize: ".8rem" }}
                    className="text-capitalize"
                  >
                    {getAttendanceStatus(atten?.attendance?.loginTime[0])}{" "}
                    <br />
                  </div>
                </div>
              ))}
          </div>
        )}
        {userType == 2 && (
          <div>
            {attendanceData
              .filter((data) => data.reportManager === reportingManager)
              .map((atten, index) => (
                <div
                  key={index}
                  className="d-flex align-items-center justify-content-between my-2"
                >
                  <div className="d-flex align-items-center gap-3">
                    <div
                      style={{
                        height: "2.2rem",
                        width: "2.2rem",
                        borderRadius: "50%",
                        background: "blue",
                      }}
                    >
                      <img
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                        src={atten?.profile?.image_url}
                        alt=""
                      />
                    </div>
                    <div className="text-capitalize">
                      {atten.FirstName} {atten.LastName} <br />
                    </div>
                  </div>

                  <div
                    style={{ fontSize: ".8rem" }}
                    className="text-capitalize"
                  >
                    {getAttendanceStatus(atten?.attendance?.loginTime[0])}{" "}
                    <br />
                  </div>
                </div>
              ))}
          </div>
        )}
        {userType == 3 && (
          <div>
            {attendanceData
              // .filter((data) => data.reportManager === reportingManager)
              .map((atten, index) => (
                <div
                  key={index}
                  className="d-flex align-items-center justify-content-between my-2"
                >
                  <div className="d-flex align-items-center gap-3">
                    <div
                      style={{
                        height: "2.2rem",
                        width: "2.2rem",
                        borderRadius: "50%",
                        background: "blue",
                      }}
                    >
                      <img
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                        src={atten?.profile?.image_url}
                        alt=""
                      />
                    </div>
                    <div className="text-capitalize">
                      {atten.FirstName} {atten.LastName} <br />
                    </div>
                  </div>

                  <div
                    style={{ fontSize: ".8rem" }}
                    className="text-capitalize"
                  >
                    {getAttendanceStatus(atten?.attendance?.loginTime[0])}{" "}
                    <br />
                  </div>
                </div>
              ))}
          </div>
        )}
        {userType == 4 && (
          <div>
            {attendanceData
              .filter((data) => data.reportManager === reportingManager)
              .map((atten, index) => (
                <div
                  key={index}
                  className="d-flex align-items-center justify-content-between my-2"
                >
                  <div className="d-flex align-items-center gap-3">
                    <div
                      style={{
                        height: "2.2rem",
                        width: "2.2rem",
                        borderRadius: "50%",
                        background: "blue",
                      }}
                    >
                      <img
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                        src={atten?.profile?.image_url}
                        alt=""
                      />
                    </div>
                    <div className="text-capitalize">
                      {atten.FirstName} {atten.LastName} <br />
                    </div>
                  </div>

                  <div
                    style={{ fontSize: ".8rem" }}
                    className="text-capitalize"
                  >
                    {getAttendanceStatus(atten?.attendance?.loginTime[0])}{" "}
                    <br />
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamManager;

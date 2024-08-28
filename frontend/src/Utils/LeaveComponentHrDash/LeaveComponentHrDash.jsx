import React from "react";
import "./LeaveComponentHrDash.css";
import { useTheme } from "../../Context/TheamContext/ThemeContext";
import { IoNewspaperOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import { GoClock } from "react-icons/go";
import { IoMdDoneAll } from "react-icons/io";
import BASE_URL from "../../Pages/config/config";
import axios from "axios";

const LeaveComponentHrDash = () => {
  const { darkMode } = useTheme();
  //   const location = useLocation();
  //   const routeChecker = location.pathname.split("/")[1];
  //   console.log(routeChecker);
  //   const [leaveApplicationHRData, setLeaveApplicationHRData] = useState([]);
  //   const [loading, setLoading] = useState(true);
  //   const [rowData, setRowData] = useState([]);
  //   const [filteredData, setFilteredData] = useState([]);
  //   const email = localStorage.getItem("Email");
  //   const formatDate = (dateString) => {
  //     if (!dateString) return;
  //     const dateParts = dateString.split("-");
  //     return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  //   };

  //   const loadLeaveApplicationHRData = () => {
  //     axios
  //       .post(
  //         `${BASE_URL}/api/leave-application-hr/`,
  //         routeChecker === "hr" ? { hr: email } : { manager: email },
  //         {
  //           headers: {
  //             authorization: localStorage.getItem("token") || "",
  //           },
  //         }
  //       )
  //       .then((response) => {
  //         const leaveApplicationHRObj = response.data;
  //         setLeaveApplicationHRData(leaveApplicationHRObj);
  //         setLoading(false);

  //         const rowDataT = leaveApplicationHRObj.map((data) => {
  //           return {
  //             data,
  //             empID: data?.empID,
  //             FirstName: data?.FirstName,
  //             LastName: data?.LastName,
  //             Name: data?.FirstName + " " + data?.LastName,
  //             Leavetype: data?.Leavetype,
  //             FromDate: formatDate(data["FromDate"]?.slice(0, 10)),
  //             ToDate: formatDate(data["ToDate"]?.slice(0, 10)),
  //             Days: calculateDays(data?.FromDate, data?.ToDate),
  //             Reasonforleave: data?.Reasonforleave,
  //             CreatedOn: formatDate(data?.createdOn?.slice(0, 10)),
  //             Status: status(data?.Status),
  //             updatedBy: data?.updatedBy,
  //             reasonOfRejection: data?.reasonOfRejection,
  //           };
  //         });
  //         console.log(rowDataT);
  //         setRowData(rowDataT);
  //         setFilteredData(rowDataT);
  //         // props.updateTotalLeaves(leaveApplicationHRObj.length);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };

  const leaveData = [
    {
      date: "19 March, 2023",
      type: "Sick",
      status: "Pending",
      icon: <GoClock />,
    },
    {
      date: "19 March, 2023",
      type: "Casual",
      status: "Rejected",
      icon: <MdOutlineCancel />,
    },
    {
      date: "19 March, 2023",
      type: "Paid",
      status: "Approved",
      icon: <IoMdDoneAll />,
    },
  ];

  const Status = (key) => {
    switch (key) {
      case "Rejected":
        return <span className="badge-primary">Rejected</span>;

      case "Approved":
        return <span className="badge-primary">Approved</span>;

      default:
        return <span className="badge-info">Pending</span>;
    }
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
      <div className="d-flex align-items-center justify-content-between">
        <h5 className="my-0 fw-normal  d-flex align-items-center gap-2">
          <IoNewspaperOutline /> On Leave
        </h5>
        <span
          style={{
            minHeight: "1.6rem",
            minWidth: "1.6rem",
            background: darkMode ? "#ededf1d4" : "#252424c3",
          }}
          className="d-flex align-items-center justify-content-center"
        >
          See all
        </span>
      </div>
      <hr className="m-1" style={{ opacity: "10%" }} />
      <div className="progress-circle">
        <svg width="200" height="80" viewBox="0 0 100 50">
          <path
            d="M 10,50 A 40,40 0 1,1 90,50"
            fill="none"
            stroke="#ddd"
            strokeWidth="12"
          />
          <path
            d="M 10,50 A 40,40 0 1,1 90,50"
            fill="none"
            stroke="#3939FF"
            strokeWidth="12"
            strokeDasharray="125.6"
            strokeDashoffset={125.6 - (125.6 * 16) / 34}
          />
        </svg>
        <div className="leave-count d-flex flex-column gap-0">
          <h6>16</h6>
          <span>OUT OF 34</span>
        </div>
      </div>
      <hr className="m-1" style={{ opacity: "10%" }} />
      <div className="leave-list">
        {leaveData.map((leave, index) => (
          <div key={index} className="leave-item">
            <span className="leave-icon">{leave.icon}</span>
            <span className="leave-date">{leave.date}</span>
            <span className="leave-type">{leave.type}</span>
            <span>{Status(leave.status)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveComponentHrDash;

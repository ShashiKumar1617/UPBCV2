import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import CustomModal from "../CustomModal/CustomModal";
import { IoCloudDownloadOutline, IoNewspaperOutline } from "react-icons/io5";
import { AttendanceContext } from "../../Context/AttendanceContext/AttendanceContext";
import { useLocation } from "react-router-dom";
import BASE_URL from "../../Pages/config/config";
import { useTheme } from "../../Context/TheamContext/ThemeContext";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const AdminNews = () => {
  // const [leaveBalance, setLeaveBalance] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const id = localStorage.getItem("_id");
  const { darkMode } = useTheme();
  const location = useLocation();
  const route = location.pathname.split("/")[1];
  const email = localStorage.getItem("Email");
  const [notice, setNotice] = useState([]);
  const { socket } = useContext(AttendanceContext);

  const loadEmployeeData = () => {
    axios
      .get(`${BASE_URL}/api/particularEmployee/${id}`, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        setNotice(response.data.Notice);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadEmployeeData();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("notice", (data) => {
        setNotice((prev) => [data, ...prev]);
      });
      socket.on("noticeDelete", (data) => {
        if (data) {
          loadEmployeeData();
        }
      });
    }
  }, [socket]);

  const pdfHandler = (path) => {
    window.open(`${BASE_URL}/${path}`, "_blank", "noreferrer");
  };

  // useEffect(() => {
  //   axios
  //     .post("http://localhost:4000/api/getLeave", { id })
  //     .then((response) => {
  //       const formattedData = response.data.map((item) => {
  //         const leaveType = Object.keys(item)[0];
  //         const totalLeaveType = Object.keys(item)[1];
  //         return {
  //           leaveType: leaveType.replace(/([A-Z])/g, " $1").trim(),
  //           balance: item[leaveType],
  //           totalBalance: item[totalLeaveType],
  //           leaveTaken: item[totalLeaveType] - item[leaveType],
  //         };
  //       });
  //       setLeaveBalance(formattedData);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  const handleViewClick = () => {
    setSelectedNews(
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, et dolor nobis quas unde officiis quaerat hic illum consequuntur, veniam maxime quisquam voluptate. Iusto quisquam porro, ea quia reiciendis rem quod, asperiores dignissimos."
    );
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedNews(null);
  };

  const ShortedText = (text) => {
    if (text.length > 180) {
      return text.slice(0, 300) + "...";
    } else {
      return text;
    }
  };

  const userType = localStorage.getItem("Account");
  console.log(userType);

  const paths = {
    1: "/admin/NoticeBoard",
    2: "/hr/NoticeBoard",
    3: "/employee/NoticeBoard",
    4: "/manager/NoticeBoard",
  };

  return (
    <>
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
            <IoNewspaperOutline /> Notice Board
          </h5>
          <span
            style={{
              minHeight: "1.6rem",
              minWidth: "1.6rem",
              borderRadius: "50%",
              background: darkMode ? "#ededf1d4" : "#252424c3",
            }}
            className="d-flex align-items-center justify-content-center"
          >
            {notice.length}
          </span>
        </div>
        {notice
          .reverse()
          .slice(0, 1)
          .map((n, i) => (
            <div key={i} className="d-flex flex-column gap-3">
              <div className="d-flex align-items-center justify-content-between gap-2">
                <div className="d-flex align-items-center gap-2">
                  <div
                    style={{
                      height: "35px",
                      width: "35px",
                      borderRadius: "50%",
                      background: "blue",
                    }}
                  >
                    <img
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                      src="https://nordicapis.com/wp-content/uploads/Profile-Pic-Circle-Grey-Large-1.png"
                      alt=""
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <h6 className="m-0 mx-1">{n.creator}</h6>
                    <span
                      style={{
                        width: "fit-content",
                        background: darkMode ? "#2f99ea4a" : "#2c2cf341",
                        color: darkMode ? "#572be8f0" : "#c8c2feed",
                      }}
                      className="p-0 px-2 text-primary rounded-3"
                    >
                      Hr
                    </span>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <a
                    title="Download Attachment"
                    style={{
                      background: darkMode ? "#2f99ea4a" : "#2c2cf341",
                      color: darkMode ? "#572be8f0" : "#c8c2feed",
                      height: "1.8rem",
                      width: "1.8rem",
                    }}
                    className="btn d-flex align-items-center justify-content-center mr-3 rounded-5  p-0"
                    href={n.attachments}
                    download={true}
                  >
                    <IoCloudDownloadOutline className="fs-5 " />
                  </a>
                  <Link
                    to={paths[userType]}
                    style={{ cursor: "pointer" }}
                    className="btn btn-light d-flex align-items-center bg-white rounded-5 px-3"
                  >
                    View All
                  </Link>
                </div>
              </div>
              <div
                style={{
                  height: "9rem",
                  width: "100%",
                  background: darkMode ? "#ededf1d4" : "#252424c3",
                  position: "relative",
                }}
                className="p-2 rounded-3"
              >
                <div
                  style={{
                    height: "15px",
                    width: "15px",
                    background: darkMode ? "#ededf1d4" : "#252424c3",
                    position: "absolute",
                    top: "-7px",
                    zIndex: "0",
                    rotate: "45deg",
                  }}
                ></div>
                <p style={{ zIndex: "1" }}>{ShortedText(n.notice)}</p>
              </div>
            </div>
          ))}
      </div>

      <CustomModal title="News" show={showModal} onClose={handleCloseModal}>
        {selectedNews}
      </CustomModal>
    </>
  );
};

export default AdminNews;

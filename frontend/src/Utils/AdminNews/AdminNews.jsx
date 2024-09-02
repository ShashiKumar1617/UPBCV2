import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { IoCloudDownloadOutline, IoNewspaperOutline } from "react-icons/io5";
import { AttendanceContext } from "../../Context/AttendanceContext/AttendanceContext";
import BASE_URL from "../../Pages/config/config";
import { useTheme } from "../../Context/TheamContext/ThemeContext";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import NoticeImg from "../../img/Notice/NoticeImg.svg"
import { HiOutlineBellAlert } from "react-icons/hi2";

const AdminNews = () => {
  const id = localStorage.getItem("_id");
  const { darkMode } = useTheme();
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

  const ShortedText = (text) => {
    if (text.length > 180) {
      return text.slice(0, 300) + "...";
    } else {
      return text;
    }
  };

  const userType = localStorage.getItem("Account");

  const paths = {
    1: "/admin/NoticeBoard",
    2: "/hr/NoticeBoard",
    3: "/employee/NoticeBoard",
    4: "/manager/NoticeBoard",
  };

  const sanitizedNotice = (notice) => {
    return  ShortedText(notice
      .replace(/<img[^>]*>/g, '')
      .replace(/<img[^>]*>/g, '')
      .replace(/<iframe[^>]*>/g, '')
      .replace(/<h1[^>]*>.*?<\/h1>/gi, '')
      .replace(/<h2[^>]*>.*?<\/h2>/gi, '')
      .replace(/<script[^>]*>.*?<\/script>/gi, ''))
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
            <HiOutlineBellAlert /> Notice
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
            {notice.length > 0 ? (        <div>
        {notice
        .slice(-1)
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
                 <div className="text-start"
              dangerouslySetInnerHTML={{ __html: sanitizedNotice(n.notice) }}
            />
              </div>
            </div>
          ))}
        </div>) : (          <div
            className="d-flex flex-column justify-content-center align-items-center gap-3"
            style={{ height: "100%", width: "100%" }}
          >
            <img
              style={{ height: "100px", width: "100px" }}
              className="mx-auto"
              src={NoticeImg}
              alt="No Data"
            />
            <p
              style={{ opacity: "60%", fontSize: "13px" }}
              className="text-center w-75 mx-auto"
            >
              No notices available at the moment.
            </p>
          </div>)}
      </div>
    </>
  );
};

export default AdminNews;

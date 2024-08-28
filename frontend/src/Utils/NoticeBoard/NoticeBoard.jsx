import React, { useEffect, useState, useContext } from "react";
import { AttendanceContext } from "../../Context/AttendanceContext/AttendanceContext";
import axios from "axios";
import { TiDeleteOutline } from "react-icons/ti";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { CgRemove } from "react-icons/cg";
import { useTheme } from "../../Context/TheamContext/ThemeContext";
import BASE_URL from "../../Pages/config/config";
import TittleHeader from "../../Pages/TittleHeader/TittleHeader";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { LuEye } from "react-icons/lu";
import { MdRemoveCircleOutline } from "react-icons/md";

const NoticeBoard = () => {
  const location = useLocation();
  const route = location.pathname.split("/")[1];
  const email = localStorage.getItem("Email");
  const [notice, setNotice] = useState([]);
  const { darkMode } = useTheme();
  const { socket } = useContext(AttendanceContext);
  const id = localStorage.getItem("_id");

  const [layoutMode, setLayoutMode] = useState("board");

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

  const deleteHandler = (id, creator) => {
    axios
      .post(`${BASE_URL}/api/noticeDelete`, { noticeId: id })
      .then((res) => {
        alert("Notice deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container-fluid box-shadow: 0 4px 10px 0 rgb(137 137 137 / 25%); h-100">
      <TittleHeader
        title={"Notice Board"}
        numbers={notice.length}
        message={"You can view all the notices here."}
      />
      <div className="d-flex justify-content-end mb-3">
        <button
          onClick={() => setLayoutMode("board")}
          className={`btn ${
            layoutMode === "board" ? "btn-primary" : "btn-secondary"
          } mx-1`}
        >
          Board
        </button>
        <button
          onClick={() => setLayoutMode("table")}
          className={`btn ${
            layoutMode === "table" ? "btn-primary" : "btn-secondary"
          } mx-1`}
        >
          Table
        </button>
        <button
          onClick={() => setLayoutMode("list")}
          className={`btn ${
            layoutMode === "list" ? "btn-primary" : "btn-secondary"
          } mx-1`}
        >
          List
        </button>
      </div>
      <div
        style={{
          minHeight: "75vh",
        }}
        className="mx-auto row row-gap-1 rounded-0 border position-relative"
      >
        {layoutMode === "board" &&
          notice
            .filter(
              (val, i, ar) =>
                ar.findIndex((item) => item.noticeId === val.noticeId) === i
            )
            .map((val) => (
              <div key={val.noticeId} className=" col-4 p-3 ">
                <div
                  className="d-flex flex-column shadow-sm border rounded d-flex p-2 justify-content-between gap-2"
                  style={{
                    backgroundColor: darkMode
                      ? "var(--secondaryDashMenuColor)"
                      : "var(--secondaryDashColorDark)",
                  }}
                >
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
                    <div className="d-flex align-items-center justify-content-between w-100">
                      {" "}
                      <div className="d-flex flex-column">
                        <h6 className="m-0 mx-1">{val.creator}</h6>
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
                      <div className="d-flex align-items-center gap-2">
                        <a
                          onClick={() => pdfHandler(val.attachments)}
                          title="View Attachment"
                          style={{
                            background: darkMode ? "#2f99ea4a" : "#2c2cf341",
                            color: darkMode ? "#572be8f0" : "#c8c2feed",
                            height: "1.8rem",
                            width: "1.8rem",
                          }}
                          className="btn d-flex align-items-center justify-content-center mr-3 rounded-5  p-0"
                        >
                          <LuEye className="fs-5 " />
                        </a>
                        <a
                          title="Download Attachment"
                          style={{
                            background: darkMode ? "#2f99ea4a" : "#2c2cf341",
                            color: darkMode ? "#572be8f0" : "#c8c2feed",
                            height: "1.8rem",
                            width: "1.8rem",
                          }}
                          className="btn d-flex align-items-center justify-content-center mr-3 rounded-5  p-0"
                          href={val.attachments}
                          download={true}
                        >
                          <IoCloudDownloadOutline className="fs-5 " />
                        </a>
                        {(route === "hr" || route === "manager") &&
                        val.creator === email ? (
                          <MdRemoveCircleOutline
                            title="Remove Notice"
                            style={{
                              background: darkMode ? "#ea2f2f49" : "#f32c2c41",
                              color: darkMode ? "#e82b2bef" : "#fc6b6bec",
                              height: "1.8rem",
                              width: "1.8rem",
                            }}
                            className="btn d-flex align-items-center justify-content-center rounded-5  p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteHandler(val.noticeId, val.creator);
                            }}
                          />
                        ) : route === "admin" ? (
                          <MdRemoveCircleOutline
                            title="Remove Notice"
                            style={{
                              background: darkMode ? "#ea2f2f49" : "#f32c2c41",
                              color: darkMode ? "#e82b2bef" : "#fc6b6bec",
                              height: "1.8rem",
                              width: "1.8rem",
                            }}
                            className="btn d-flex align-items-center justify-content-center rounded-5  p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteHandler(val.noticeId, val.creator);
                            }}
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div>{val.notice}</div>
                </div>
              </div>
            ))}
        {layoutMode === "list" && (
          <div className="d-flex flex-column  gap-3">
            {notice.map((val, i) => (
              <li key={val.noticeId} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center gap-3">
                  <div className="d-flex align-items-start gap-3">
                    <span>{i + 1}.</span>
                    <span>{val.notice}</span>
                  </div>
                  <div className="d-flex flex-column align-items-center gap-2">
                    <a
                      onClick={() => pdfHandler(val.attachments)}
                      title="View Attachment"
                      className="btn btn-light"
                    >
                      <LuEye />
                    </a>
                    <a
                      title="Download Attachment"
                      className="btn btn-light"
                      href={val.attachments}
                      download={true}
                    >
                      <IoCloudDownloadOutline />
                    </a>
                    {(route === "hr" || route === "manager") &&
                    val.creator === email ? (
                      <TiDeleteOutline
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteHandler(val.noticeId, val.creator);
                        }}
                        className="text-danger"
                      />
                    ) : route === "admin" ? (
                      <TiDeleteOutline
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteHandler(val.noticeId, val.creator);
                        }}
                        className="text-danger"
                      />
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </div>
        )}
        {layoutMode === "table" && (
          <table className="table">
            <thead>
              <tr>
                <th>Notice</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {notice.map((val) => (
                <tr key={val.noticeId}>
                  <td>{val.notice}</td>
                  <td className="d-flex align-items-center gap-2">
                    <a
                      onClick={() => pdfHandler(val.attachments)}
                      title="View Attachment"
                      className="btn btn-light"
                    >
                      <LuEye />
                    </a>
                    <a
                      title="Download Attachment"
                      className="btn btn-light"
                      href={val.attachments}
                      download={true}
                    >
                      <IoCloudDownloadOutline />
                    </a>
                    {(route === "hr" || route === "manager") &&
                    val.creator === email ? (
                      <TiDeleteOutline
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteHandler(val.noticeId, val.creator);
                        }}
                        className="text-danger"
                      />
                    ) : route === "admin" ? (
                      <TiDeleteOutline
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteHandler(val.noticeId, val.creator);
                        }}
                        className="text-danger"
                      />
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default NoticeBoard;

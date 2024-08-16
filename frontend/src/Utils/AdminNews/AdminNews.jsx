import React, { useEffect, useState } from "react";
import { useTheme } from "../../Context/TheamContext/ThemeContext";
import axios from "axios";
import CustomModal from "../CustomModal/CustomModal";
import { IoNewspaperOutline } from "react-icons/io5";

const AdminNews = () => {
  const [leaveBalance, setLeaveBalance] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
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
      return text.toString().slice(0, 300) + "...";
    } else {
      return text;
    }
  };

  const text =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit Reprehenderit, et dolor nobis quas unde officiis quaerat hic illum consequuntur, veniam maxime quisquam voluptate. Iusto quisquam porro, ea quia reiciendis rem quod, asperiores dignissimos";

  return (
    <>
      <div
        style={{
          height: "17rem",
          overflow: "hidden",
          background: "#F5F5F6",
        }}
        className="p-2 px-3 shadow-sm rounded-2 d-flex flex-column gap-2"
      >
        <div className="d-flex align-items-center justify-content-between">
          <h5 className="my-0 fw-normal  d-flex align-items-center gap-2">
            <IoNewspaperOutline /> News
          </h5>{" "}
          <span
            className="d-flex align-items-center justify-content-center"
            style={{
              height: "25px",
              width: "25px",
              borderRadius: "50%",
              background: "white",
            }}
          >
            {" "}
            1
          </span>
        </div>
        <div className="d-flex flex-column gap-3">
          <div className="d-flex align-items-center justify-content-between px-2">
            <div className="d-flex align-items-center">
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
              <div className="d-flex flex-column gap-1 mx-2">
                <h6 className="m-0 mx-1">Kishor Kumar</h6>
                <span
                  style={{ width: "fit-content", background: "#E3F3FF" }}
                  className="p-0 px-2 text-primary  rounded-3"
                >
                  Admin
                </span>
              </div>
            </div>
            <button
              className="btn btn-light bg-white rounded-5 px-3"
              onClick={handleViewClick}
            >
              View
            </button>
          </div>
          <div
            style={{
              height: "9rem",
              width: "100%",
              background: "white",
              position: "relative",
            }}
            className="p-2 rounded-3"
          >
            <div
              style={{
                height: "15px",
                width: "15px",
                background: "white",
                position: "absolute",
                top: "-7px",
                zIndex: "0",
                rotate: "45deg",
              }}
            ></div>
            <p style={{ zIndex: "1" }}>{ShortedText(text)}</p>
          </div>
        </div>
      </div>

      <CustomModal title="News" show={showModal} onClose={handleCloseModal}>
        {selectedNews}
      </CustomModal>
    </>
  );
};

export default AdminNews;

import React, { useState, useEffect } from "react";
import "./PositionTable.css";
import axios from "axios";
import { RingLoader } from "react-spinners";
import { Table } from "react-bootstrap";
import { useTheme } from "../../Context/TheamContext/ThemeContext";
import Position from "../../img/Position/Position.svg";
import BASE_URL from "../config/config";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import OverLayToolTip from "../../Utils/OverLayToolTip";
import { FiEdit2 } from "react-icons/fi";

const PositionTable = ({
  updateTotalPositions,
  onAddPosition,
  onEditPosition,
}) => {
  const [positionData, setPositionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const { darkMode } = useTheme();

  useEffect(() => {
    loadPositionData();
  }, []);

  const loadPositionData = () => {
    axios
      .get(`${BASE_URL}/api/position`, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        setPositionData(response.data);
        setLoading(false);
        // updateTotalPositions(response.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onPositionDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      axios
        .delete(`${BASE_URL}/api/position/${id}`, {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        })
        .then(() => {
          loadPositionData();
        })
        .catch((err) => {
          console.log(err);
          if (err.response && err.response.status === 403) {
            window.alert(err.response.data);
          }
        });
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = positionData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(positionData.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const rowHeadStyle = {
    verticalAlign: "middle",
    whiteSpace: "pre",
    background: "#EAE9FF",
    color: darkMode
      ? "var(--primaryDashColorDark)"
      : "var(--secondaryDashMenuColor)",
    border: "none",
    position: "sticky",
    top: "0rem",
    zIndex: "100",
  };

  const rowBodyStyle = {
    verticalAlign: "middle",
    whiteSpace: "pre",
    background: darkMode
      ? "var(--secondaryDashMenuColor)"
      : "var(--secondaryDashColorDark)",
    color: darkMode
      ? "var(--secondaryDashColorDark)"
      : "var(--primaryDashMenuColor)",
        borderBottom:'1px solid rgba(0,0,0,.08)'
  };

  return (
    <div className="container-fluid py-2">
      <div className="d-flex justify-content-between py-2">
        <div className="my-auto">
          <h5
            style={{
              color: darkMode
                ? "var(--secondaryDashColorDark)"
                : "var(--secondaryDashMenuColor)",
              fontWeight: "600",
            }}
            className="m-0"
          >
            Position Details ({positionData.length})
          </h5>
          <p
            style={{
              color: darkMode
                ? "var(--secondaryDashColorDark)"
                : "var(--secondaryDashMenuColor)",
            }}
            className="m-0"
          >
            You can see all position's list here
          </p>
        </div>
        <button
          className="btn btn-primary gap-1 d-flex my-auto align-items-center justify-content-center"
          onClick={onAddPosition}
        >
          <AiOutlinePlusCircle className="fs-4" />
          <span className="d-none d-md-flex">Create Position</span>
        </button>
      </div>

      <div id="clear-both" />
      {loading && (
        <div className="d-flex justify-content-center">
          <RingLoader size={50} color={"#0000ff"} loading={true} />
        </div>
      )}

      <div
        style={{
          color: darkMode
            ? "var(--secondaryDashColorDark)"
            : "var(--secondaryDashMenuColor)",
          overflow: "auto",
          maxHeight: "80vh",
          position: "relative",
        }}
      >
        {positionData.length > 0 ? (
          <>
            <Table className="table" style={{ fontSize: ".9rem" }}>
              <thead>
                <tr>
                  <th style={rowHeadStyle}>S. No.</th>
                  <th style={rowHeadStyle}>Company</th>
                  <th style={rowHeadStyle}>Position</th>
                  <th style={rowHeadStyle} className="text-end">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((data, index) => (
                  <tr key={index}>
                    <td style={rowBodyStyle} className="text-capitalize">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td style={rowBodyStyle} className="text-capitalize">
                      {data.company[0].CompanyName}
                    </td>
                    <td style={rowBodyStyle} className="text-capitalize">
                      {data.PositionName}
                    </td>
                    <td
                      style={rowBodyStyle}
                      className="text-capitalize text-end"
                    >
                      <OverLayToolTip
                        style={{ color: darkMode ? "black" : "white" }}
                        icon={<FiEdit2 className="text-primary" />}
                        onClick={() => onEditPosition(data)}
                        tooltip={"Edit Position"}
                      />
                      <OverLayToolTip
                        style={{ color: darkMode ? "black" : "white" }}
                        icon={<AiOutlineDelete className="fs-5 text-danger" />}
                        onClick={() => onPositionDelete(data._id)}
                        tooltip={"Delete Position"}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {/* Pagination Controls */}
            <div className="d-flex justify-content-between align-items-center mt-3">
              <span>
                Showing {indexOfFirstItem + 1} to{" "}
                {Math.min(indexOfLastItem, positionData.length)} of{" "}
                {positionData.length} results
              </span>
              <div className="pagination">
                <button
                  className="btn bg-light rounded-5 border shadow-sm py-1 mx-1"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    className={`btn mx-1 ${
                      currentPage === i + 1
                        ? "btn bg-dark text-white rounded-5 border shadow-sm py-0 mx-1"
                        : "btn bg-light rounded-5 border shadow-sm py-0 mx-1"
                    }`}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className="btn bg-light rounded-5 border shadow-sm py-1 mx-1"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        ) : (
          <div
            style={{
              height: "80vh",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              wordSpacing: "5px",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            <img
              style={{
                height: "auto",
                width: "20%",
              }}
              src={Position}
              alt="img"
            />
            <p
              className="text-center w-75 mx-auto"
              style={{
                color: darkMode
                  ? "var(--secondaryDashColorDark)"
                  : "var(--primaryDashMenuColor)",
              }}
            >
              Position not created yet, to create new role click on "+ Create
              Position" button.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PositionTable;

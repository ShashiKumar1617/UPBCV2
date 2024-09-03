import React, { useState, useEffect, useCallback } from "react";
import "./CountryTable.css";
import axios from "axios";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { useTheme } from "../../Context/TheamContext/ThemeContext";
import BASE_URL from "../config/config";
import OverLayToolTip from "../../Utils/OverLayToolTip";
import { FiEdit2 } from "react-icons/fi";

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

const CountryTable = (props) => {
  const [countryData, setCountryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page
  const { darkMode } = useTheme();

  const loadCountryData = useCallback(() => {
    axios
      .get(`${BASE_URL}/api/country`, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        setCountryData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    loadCountryData();
  }, [loadCountryData]);

  const onCountryDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      axios
        .delete(`${BASE_URL}/api/country/${id}`, {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        })
        .then(() => {
          loadCountryData();
        })
        .catch((err) => {
          console.log(err.response);
          if (err.response.status === 403) {
            window.alert(err.response.data);
          }
        });
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = countryData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(countryData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const rowHeadStyle = {
    verticalAlign: "middle",
    whiteSpace: "pre",
    background: darkMode
      ? "#EAE9FF"
      : "#EAE9FF",
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
            Country Details ({countryData.length})
          </h5>
          <p
            style={{
              color: darkMode
                ? "var(--secondaryDashColorDark)"
                : "var(--secondaryDashMenuColor)",
            }}
            className="m-0"
          >
            You can see all country list here.
          </p>
        </div>
        <button
          className="btn btn-primary gap-1 d-flex my-auto align-items-center justify-content-center"
          onClick={props.onAddCountry}
        >
          <AiOutlinePlusCircle className="fs-4" />
          <span className="d-none d-md-flex">Add Country</span>
        </button>
      </div>

      <div id="clear-both" />
      {loading && (
        <div id="loading-bar">
          <RingLoader
            css={override}
            sizeUnit={"px"}
            size={50}
            color={"#0000ff"}
            loading={true}
          />
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
        <table className="table" style={{ fontSize: ".9rem" }}>
          <thead>
            <tr style={{ position: "sticky", top: "0" }}>
              <th style={rowHeadStyle}>Country</th>
              <th className="text-end" style={rowHeadStyle}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td style={rowBodyStyle}>{item.CountryName}</td>
                <td className="text-end" style={rowBodyStyle}>
                  <OverLayToolTip
                    style={{ color: darkMode ? "black" : "white" }}
                    icon={<FiEdit2 className="text-primary"/>}
                    onClick={() => props.onEditCountry(item)}
                    tooltip={"Edit Country"}
                  />
                  <OverLayToolTip
                    style={{ color: darkMode ? "black" : "white" }}
                    icon={<AiOutlineDelete className="fs-5 text-danger" />}
                    onClick={() => onCountryDelete(item._id)}
                    tooltip={"Delete Country"}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span>
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, countryData.length)} of {countryData.length}{" "}
            results
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
      </div>
    </div>
  );
};

export default CountryTable;

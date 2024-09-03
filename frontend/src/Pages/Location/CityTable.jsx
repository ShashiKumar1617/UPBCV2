import React, { useState, useEffect } from "react";
import "./CityTable.css";
import axios from "axios";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import { useTheme } from "../../Context/TheamContext/ThemeContext";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import BASE_URL from "../config/config";
import OverLayToolTip from "../../Utils/OverLayToolTip";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FiEdit2 } from "react-icons/fi";

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

const CityTable = ({ onAddCity, onEditCity }) => {
  const [cityData, setCityData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Adjust this value for items per page
  const { darkMode } = useTheme();

  useEffect(() => {
    loadCityData();
  }, [currentPage]);

  const loadCityData = () => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/api/city`, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        const cityObj = response.data;
        setCityData(cityObj);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const onCityDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      axios
        .delete(`${BASE_URL}/api/city/${id}`, {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        })
        .then(() => {
          loadCityData();
        })
        .catch((err) => {
          console.log(err);
          if (err.response && err.response.status === 403) {
            window.alert(err.response.data);
          } else {
            window.alert("An error occurred while deleting the record.");
          }
        });
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cityData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(cityData.length / itemsPerPage);

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
    <div style={{ height: '83vh', overflow: 'hidden' , }} className="container-fluid py-2">
      <div className="d-flex justify-content-between align-items-start mb-3">
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
            City Details ({cityData.length})
          </h5>
          <p
            style={{
              color: darkMode
                ? "var(--secondaryDashColorDark)"
                : "var(--secondaryDashMenuColor)",
            }}
            className="m-0"
          >
            You can see all city's list here.
          </p>
        </div>
        <button
          className="btn btn-primary gap-1 d-flex my-auto align-items-center justify-content-center"
          onClick={onAddCity}
        >
          <AiOutlinePlusCircle className="fs-4" />
          <span className="d-none d-md-flex">Add City</span>
        </button>
      </div>
      <div id="clear-both" />

      {!loading ? (
        <div className="d-flex flex-column">
          <div className="flex-grow-1">
            <table className="table">
              <thead>
                <tr style={{ position: "sticky", top: "0" }}>
                  <th style={rowHeadStyle}>Country</th>
                  <th style={rowHeadStyle}>State</th>
                  <th style={rowHeadStyle}>City</th>
                  <th style={rowHeadStyle} className="text-end">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((items, index) => (
                  <tr className="text-capitalize" key={index}>
                    <td style={rowBodyStyle}>
                      {items.state[0].country[0].CountryName}
                    </td>
                    <td style={rowBodyStyle}>{items.state[0].StateName}</td>
                    <td style={rowBodyStyle}>{items.CityName}</td>
                    <td className="text-end" style={rowBodyStyle}>
                      <OverLayToolTip
                        style={{ color: darkMode ? "black" : "white" }}
                        icon={<FiEdit2 className="text-primary"/>}
                        onClick={() => onEditCity(items)}
                        tooltip={"Edit City"}
                      />
                      <OverLayToolTip
                        style={{ color: darkMode ? "black" : "white" }}
                        icon={<AiOutlineDelete className="fs-5 text-danger" />}
                        onClick={() => onCityDelete(items._id)}
                        tooltip={"Delete City"}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <span>
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, cityData.length)} of {cityData.length}{" "}
              results
            </span>
            <div className="pagination">
              <button
                className="btn bg-light rounded-5 border shadow-sm py-1 mx-1"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <IoIosArrowBack /> Previous
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
                Next <IoIosArrowForward />
              </button>
            </div>
          </div>
        </div>
      ) : (
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
    </div>
  );
};

export default CityTable;

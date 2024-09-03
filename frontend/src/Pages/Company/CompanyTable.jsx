import React, { useState, useEffect } from "react";
import axios from "axios";
import { RingLoader } from "react-spinners";
import { useTheme } from "../../Context/TheamContext/ThemeContext";
import BASE_URL from "../config/config";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import OverLayToolTip from "../../Utils/OverLayToolTip";
import { FiEdit2 } from "react-icons/fi";

const AdminCompanyTable = (props) => {
  const [companyData, setCompanyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); 
  const { darkMode } = useTheme();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/company`, {
        headers: { authorization: localStorage.getItem("token") || "" },
      })
      .then((response) => {
        setCompanyData(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const onCompanyDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      axios
        .delete(`${BASE_URL}/api/company/${id}`, {
          headers: { authorization: localStorage.getItem("token") || "" },
        })
        .then(() =>
          setCompanyData(companyData.filter((item) => item._id !== id))
        )
        .catch((err) => console.log(err));
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = companyData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(companyData.length / itemsPerPage);

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
            className=" m-0"
          >
            Company Details ({companyData.length})
          </h5>
          <p
            style={{
              color: darkMode
                ? "var(--secondaryDashColorDark)"
                : "var(--secondaryDashMenuColor)",
            }}
            className=" m-0"
          >
            You can see all Company list here
          </p>
        </div>
        <button
          className="btn btn-primary gap-1 d-flex  my-auto align-items-center justify-content-center"
          onClick={props.onAddCompany}
        >
          <AiOutlinePlusCircle className="fs-4" />
          <span className="d-none d-md-flex">Create Company</span>
        </button>
      </div>

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
          minHeight: "80vh",
          position: "relative",
        }}
      >
        {companyData.length > 0 ? (
          <>
            <table className="table" style={{ fontSize: ".9rem" }}>
              <thead>
                <tr>
                  <th style={rowHeadStyle}>Company Name</th>
                  <th style={rowHeadStyle}>Address</th>
                  <th style={rowHeadStyle}>Country</th>
                  <th style={rowHeadStyle}>State</th>
                  <th style={rowHeadStyle}>City</th>
                  <th style={rowHeadStyle}>Postal Code</th>
                  <th style={rowHeadStyle}>Website</th>
                  <th style={rowHeadStyle}>Email</th>
                  <th style={rowHeadStyle}>Contact Person</th>
                  <th style={rowHeadStyle}>Contact No</th>
                  <th style={rowHeadStyle}>Fax No</th>
                  <th style={rowHeadStyle}>Pan No</th>
                  <th style={rowHeadStyle}>GST No</th>
                  <th style={rowHeadStyle}>CIN No</th>
                  <th className="text-end" style={rowHeadStyle}>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <tr key={item._id}>
                    <td style={rowBodyStyle}>{item.CompanyName}</td>
                    <td style={rowBodyStyle}>{item.Address}</td>
                    <td style={rowBodyStyle}>
                      {item.city[0].state[0].country[0].CountryName}
                    </td>
                    <td style={rowBodyStyle}>
                      {item.city[0].state[0].StateName}
                    </td>
                    <td style={rowBodyStyle}>{item.city[0].CityName}</td>
                    <td style={rowBodyStyle}>{item.PostalCode}</td>
                    <td style={rowBodyStyle}>{item.Website}</td>
                    <td style={rowBodyStyle}>{item.Email}</td>
                    <td style={rowBodyStyle}>{item.ContactPerson}</td>
                    <td style={rowBodyStyle}>{item.ContactNo}</td>
                    <td style={rowBodyStyle}>{item.FaxNo}</td>
                    <td style={rowBodyStyle}>{item.PanNo}</td>
                    <td style={rowBodyStyle}>{item.GSTNo}</td>
                    <td style={rowBodyStyle}>{item.CINNo}</td>
                    <td className="text-end" style={rowBodyStyle}>
                      <OverLayToolTip
                        style={{ color: darkMode ? "black" : "white" }}
                        icon={<FiEdit2 className="text-primary" />}
                        onClick={() => props.onEditCompany(item)}
                        tooltip={"Edit Company"}
                      />
                      <OverLayToolTip
                        style={{ color: darkMode ? "black" : "white" }}
                        icon={<AiOutlineDelete className="fs-5 text-danger" />}
                        onClick={() => onCompanyDelete(item._id)}
                        tooltip={"Delete Company"}
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
                {Math.min(indexOfLastItem, companyData.length)} of{" "}
                {companyData.length} results
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
          !loading && <div className="text-center py-5">No companies found.</div>
        )}
      </div>
    </div>
  );
};

export default AdminCompanyTable;

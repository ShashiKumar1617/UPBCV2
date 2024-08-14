import axios from "axios";
import React, { useState, useEffect } from "react";
import { GiPartyPopper } from "react-icons/gi";
import HappyBirthday from "./HappyBirthday.svg";
import BASE_URL from "../../../../Pages/config/config";

const UpcomingBirthdays = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowData, setRowData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isIdFilterActive, setIsIdFilterActive] = useState(false);
  const [isIdSortAscending, setIsIdSortAscending] = useState(true);
  const [upcomingBirthdays, setUpcomingBirthdays] = useState([]);

  const loadEmployeeData = () => {
    axios
      .get(`${BASE_URL}/api/employee/` + localStorage.getItem("_id"), {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setEmployeeData(response.data);
          setLoading(false);

          setRowData([]);

          response.data.forEach((data) => {
            let temp = {
              data,
              Email: data["Email"],
              Password: data["Password"],
              Account:
                data["Account"] === 1
                  ? "Admin"
                  : data["Account"] === 2
                  ? "HR"
                  : data["Account"] === 3
                  ? "Employee"
                  : "",
              RoleName: data["role"][0] ? data["role"][0]["RoleName"] : "",
              FirstName: data["FirstName"],
              MiddleName: data["MiddleName"],
              LastName: data["LastName"],
              DOB: data["DOB"].slice(0, 10),
              ContactNo: data["ContactNo"],
              EmployeeCode: data["EmployeeCode"],
              empID: data["empID"],
              DepartmentName: data["department"][0]
                ? data["department"][0]["DepartmentName"]
                : "",
              PositionName: data["position"][0]
                ? data["position"][0]["PositionName"]
                : "",
              DateOfJoining: data["DateOfJoining"].slice(0, 10),
            };

            setRowData((prevData) => [...prevData, temp]);
          });
        } else {
          console.error("Data received is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadEmployeeData();
  }, []);

  const formatDOB = (dob) => {
    const date = new Date(dob);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  const calculateUpcomingBirthdays = () => {
    const today = new Date();
    const upcomingBirthdaysData = rowData.filter((employee) => {
      const dob = new Date(employee.DOB);
      dob.setFullYear(today.getFullYear());

      const timeDiff = dob - today;
      const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

      if (daysDiff === 0) {
        employee.birthdayMessage = "Today";
      } else if (daysDiff > 0 && daysDiff <= 7) {
        employee.birthdayMessage = "This week";
      }

      return daysDiff >= 0 && daysDiff <= 7;
    });

    setUpcomingBirthdays(upcomingBirthdaysData);
  };

  useEffect(() => {
    calculateUpcomingBirthdays();
  }, [rowData]);

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
        <h5 className="my-0 fw-normal">B' day</h5>
        <span
          className="d-flex align-items-center justify-content-center"
          style={{
            height: "25px",
            width: "25px",
            borderRadius: "50%",
            background: "white",
          }}
        >
          {upcomingBirthdays.length}
        </span>
      </div>
      <div style={{ height: "13rem" }}>
        {upcomingBirthdays.length > 0 ? (
          <div
            className="d-flex flex-column gap-3 p-3 rounded-3 bg-white h-100"
            style={{ overflow: "auto" }}
          >
            {upcomingBirthdays.map((employee) => (
              <div className="" key={employee.empID}>
                <div className="row ">
                  <div className="col-5 d-flex align-items-center gap-2">
                    <div style={{ height: "32px", width: "32px" }}>
                      <img
                        style={{
                          height: "100%",
                          width: "100%",
                          borderRadius: "50%",
                          overflow: "hidden",
                          objectFit: "cover",
                        }}
                        src={
                          employee?.data?.profile?.image_url
                            ? employee?.data?.profile?.image_url
                            : "https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp"
                        }
                        alt=""
                      />
                    </div>
                    <div className="d-flex flex-column my-auto">
                      <h6
                        style={{ fontSize: ".9rem" }}
                        className="text-capitalize m-0"
                      >{`${employee.FirstName} ${employee.LastName}`}</h6>
                      <span style={{ fontSize: ".8rem" }}>
                        {employee.PositionName}
                      </span>
                    </div>
                  </div>
                  <div className="col-5 my-auto">
                    <span
                      className="py-1 px-2 rounded-2"
                      style={{ background: "#E3F3FF", fontSize: ".8rem" }}
                    >
                      {employee.birthdayMessage || "This week"}
                    </span>
                    <br />
                    <span style={{ fontSize: ".9rem" }}>
                      {formatDOB(employee.DOB)}
                    </span>
                  </div>
                  <div
                    className="col-2 d-flex align-items-center justify-content-center"
                    style={{
                      height: "35px",
                      width: "35px",
                      background: "#E3F3FF",
                      borderRadius: "50%",
                    }}
                  >
                    <GiPartyPopper className="text-primary fs-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="d-flex flex-column justify-content-center align-items-center gap-3"
            style={{ height: "100%", width: "100%" }}
          >
            <img
              style={{ height: "100px", width: "100px" }}
              className="mx-auto"
              src={HappyBirthday}
              alt="Happy Birthday"
            />
            <p
              style={{ opacity: "60%", fontSize: "13px" }}
              className="text-center w-75 mx-auto  text-muted "
            >
              No upcoming birthdays in the next 7 days.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingBirthdays;

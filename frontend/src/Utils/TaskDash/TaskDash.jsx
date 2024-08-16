import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../Pages/config/config";
import "./TaskDash.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { HiArrowLongRight, HiOutlineCalendarDays } from "react-icons/hi2";
import { MdOutlineAddTask } from "react-icons/md";

const TaskDash = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const email = localStorage.getItem("Email");

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
      setError("Error fetching tasks. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const ShortedText = (text) => {
    if (text.length > 130) {
      return text.toString().slice(0, 130) + "...";
    } else {
      return text;
    }
  };

  const formatDOB = (dob) => {
    const date = new Date(dob);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  const formatUpdateDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleWheel = (e) => {
    const container = e.currentTarget;
    if (e.deltaY !== 0) {
      container.scrollLeft += e.deltaY; // Scroll horizontally on vertical scroll
      e.preventDefault(); // Prevent default vertical scroll
    }
  };

  // Function to calculate the overall progress of the task
  const calculateProgress = (task) => {
    const totalEmployees =
      task.employees.length -
      task.employees.filter((emp) => emp.emptaskStatus === "Rejected").length;
    const completedTasks = task.employees.filter(
      (emp) => emp.emptaskStatus === "Completed"
    ).length;
    return totalEmployees > 0 ? (completedTasks / totalEmployees) * 100 : 0;
  };

  return (
    <div
      style={{
        height: "17rem",
        overflow: "hidden",
        background: "#F5F5F6",
      }}
      className="px-3 scroll-container shadow-sm rounded-2 d-flex flex-column gap-2 justify-content-between pb-2 pt-2"
      onWheel={handleWheel}
    >
      <div
        style={{ height: "3vh" }}
        className="d-flex align-items-center justify-content-between"
      >
        <h5 className="my-0 fw-normal  d-flex align-items-center gap-2">
          <MdOutlineAddTask /> Team Task
        </h5>
        <Link
          to="/employee/activeTask"
          className="d-flex text-decoration-none text-black align-items-center justify-content-center bg-white p-1 px-2 rounded-5"
        >
          See All
        </Link>
      </div>
      <div
        className="d-flex w-100 align-items-center gap-3 py-2"
        style={{
          overflowX: "auto",
          overflowY: "hidden",
          whiteSpace: "nowrap",
          height: "calc(100% - 3vh)",
        }}
      >
        {tasks
          .filter(
            (task) =>
              task.status === "Pending" &&
              task.employees.some((taskemp) => taskemp.empemail === email)
          )
          .reverse()
          .map((task, index) => (
            <div
              style={{
                height: "100%",
                minHeight: "13rem",
                width: "45%",
                minWidth: "25rem",
                overflow: "hidden",
              }}
              className="shadow-sm rounded-3 d-flex flex-column justify-content-between p-2 border bg-light"
              key={index}
            >
              <div>
                <div className="d-flex align-items-center justify-content-between">
                  <h6 className="m-0">{task.Taskname}</h6>
                  <span
                    className="mx-1 text-warning p-0 px-2 rounded-3"
                    style={{ background: "#f8fbbe5f" }}
                  >
                    {task.status}
                  </span>
                </div>

                <div
                  style={{ fontSize: ".8rem" }}
                  className="d-flex align-items-center gap-3"
                >
                  <div className="my-1">
                    <span
                      style={{ width: "fit-content", background: "#cbffd1d1" }}
                      className="p-0 px-2 d-flex align-items-center gap-1 text-success  rounded-0"
                    >
                      <HiOutlineCalendarDays /> {formatDOB(task.startDate)}
                    </span>
                  </div>
                  <HiArrowLongRight />
                  <div>
                    <span
                      style={{ width: "fit-content", background: "#ffc4c461" }}
                      className="p-0 px-2 d-flex align-items-center gap-1 text-danger  rounded-0"
                    >
                      <HiOutlineCalendarDays /> {formatDOB(task.endDate)}
                    </span>
                  </div>
                </div>
                <p
                  style={{
                    whiteSpace: "wrap",
                  }}
                >
                  {ShortedText(task.description)}
                </p>
              </div>
              <div>
                <div className="d-flex align-items-center  gap-3 justify-content-between p-1">
                  <div
                    style={{
                      minHeight: ".5rem",
                      height: ".5rem",
                      maxHeight: ".5rem",
                      width: "100%",
                      background: "#78788054",
                    }}
                    className="rounded-5 "
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${calculateProgress(task)}%`,
                        background: "#007AFF",
                      }}
                      className="rounded-5"
                    ></div>
                  </div>
                  <span style={{ fontSize: ".8rem" }}>
                    {calculateProgress(task).toFixed(2)}%
                  </span>
                </div>
                <p style={{ fontSize: ".8rem" }} className="text-muted ">
                  Last Update : {formatUpdateDate(task.updatedAt)}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TaskDash;

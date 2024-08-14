import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../Pages/config/config";
import { TbTargetArrow } from "react-icons/tb";
import { MdOutlineCancel } from "react-icons/md";

const TaskDash = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const email = localStorage.getItem("Email");

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/tasks`);
      setTasks(response.data);

      let fildata = response.data.filter(
        (task) =>
          task.status === "Pending" &&
          task.employees.some(
            (taskemp) =>
              taskemp.empemail === email && taskemp.emptaskStatus === "Accepted"
          )
      );
      console.log(fildata);
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
    if (text.length > 150) {
      return text.toString().slice(0, 150) + "...";
    } else {
      return text;
    }
  };

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
        <h5 className="my-0 fw-normal">Team Task</h5>{" "}
        <span className="d-flex align-items-center justify-content-center bg-white p-1 px-2 rounded-5">
          See All
        </span>
      </div>
      <div
        className="d-flex w-100 align-items-center gap-3"
        style={{ overflowX: "auto", overflow: "hidden", whiteSpace: "nowrap" }}
      >
        {tasks
          .filter(
            (task) =>
              task.status === "Pending" &&
              task.employees.some((taskemp) => taskemp.empemail === email)
          )
          .map((task, index) => (
            <div
              style={{
                height: "9rem",
                width: "45%",
                minWidth: "250px",
                overflow: "hidden",
              }}
              className="shadow-sm rounded-3 d-flex flex-column justify-content-between p-2 border bg-light"
              key={index}
            >
              <div>
                <h6>{task.Taskname}</h6>
                <p style={{ whiteSpace: "wrap" }}>
                  {ShortedText(task.description)}
                </p>
              </div>
              <div
                style={{
                  height: "2rem",
                  width: "100%",
                  background: "#78788054",
                }}
                className="rounded-5 py-1 px-2"
              >
                <div
                  style={{
                    height: "100%",
                    width: "50%",
                    background: "#007AFF",
                  }}
                  className="rounded-5"
                ></div>
              </div>
            </div>
          ))}
      </div>

      <div
        className="d-flex justify-content-between align-items-center text-white p-2 rounded-5 shadow-sm"
        style={{ background: "#424242" }}
      >
        <TbTargetArrow className="fs-4" />
        <p className="m-0">Your team has 5 tasks today. Keep it up💪</p>
        <MdOutlineCancel className="fs-4" />
      </div>
    </div>
  );
};

export default TaskDash;

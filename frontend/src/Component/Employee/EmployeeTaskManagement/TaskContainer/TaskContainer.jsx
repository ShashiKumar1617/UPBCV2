import React from "react";

const TaskContainer = () => {
  return (
    <div>
      <div className="d-flex align-items-center gap-2 justify-content-end">
        <Link
          className="btn shadow-sm border"
          style={{ background: "#F5F5F5" }}
          to="/employee/newTask"
        >
          New
        </Link>
        <Link
          className="btn shadow-sm border"
          style={{ background: "#F5F5F5" }}
          to="/employee/activeTask"
        >
          Active
        </Link>
        <Link
          className="btn shadow-sm border"
          style={{ background: "#F5F5F5" }}
          to="/employee/taskcomplete"
        >
          Completed
        </Link>
        <Link
          className="btn shadow-sm border"
          style={{ background: "#F5F5F5" }}
          to="/employee/taskreject"
        >
          Rejected
        </Link>
      </div>
    </div>
  );
};

export default TaskContainer;

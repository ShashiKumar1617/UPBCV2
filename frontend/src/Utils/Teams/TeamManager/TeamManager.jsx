import React from "react";
import { SiMicrosoftteams } from "react-icons/si";

const TeamManager = () => {
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
        <h5 className="my-0 fw-normal d-flex align-items-center gap-2">
          <SiMicrosoftteams />
          Team
        </h5>
      </div>
      <div></div>
    </div>
  );
};

export default TeamManager;

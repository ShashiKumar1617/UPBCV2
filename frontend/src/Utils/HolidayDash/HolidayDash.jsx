import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GiPartyFlags } from "react-icons/gi";
import { fetchHolidays } from "../../Redux/Slices/holidaysSlice";

const HolidayDash = () => {
  const dispatch = useDispatch();
  const holidaysData = useSelector((state) => state.holidays.holidaysData);
  const status = useSelector((state) => state.holidays.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchHolidays());
    }
  }, [status, dispatch]);

  console.log(holidaysData);

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
        <h5 className="my-0 fw-normal  d-flex align-items-center gap-2">
          <GiPartyFlags />
          Holidays
        </h5>
        <span
          className="d-flex align-items-center justify-content-center"
          style={{
            height: "25px",
            width: "25px",
            borderRadius: "50%",
            background: "white",
          }}
        >
          {holidaysData.length}
        </span>
      </div>
      <span>August, 2024</span>
      <div
        style={{ height: "10rem", overflow: "auto" }}
        className="bg-white rounded-3 p-2 py-3"
      >
        {holidaysData.map((holiday, index) => (
          <div key={index} className="row mx-auto my-3 align-items-center">
            <span className="col-1 d-flex align-items-center">
              <div
                style={{ height: ".5rem", width: ".5rem", borderRadius: "50%" }}
                className="bg-primary"
              ></div>
            </span>
            <span className="col-10 d-flex align-items-center">
              {holiday.name}
            </span>
            <span className="col-1 d-flex align-items-center">
              {new Date(holiday.date).getDate()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HolidayDash;

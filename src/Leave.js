import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { NavBar } from "./NavBar";
import "react-datepicker/dist/react-datepicker.css";

export const Leave = (props) => {
  const [leaveData, setLeaveData] = useState({});

  function handleOnChange(key, value) {
    const leaveDataClone = { ...leaveData, [key]: value };
    setLeaveData(leaveDataClone);
  }
  function getDateFormat(date) {
    return new Date(date).toLocaleDateString("fr-FR");
  }

  function convertDateToDbFormat(date) {
    return date.split("/").reverse().join("-");
  }

  function handleOnSubmit() {
    const { fromDate, toDate, ...rest } = leaveData;
    const payload = {
      ...rest,
      fromDate: convertDateToDbFormat(fromDate),
      toDate: convertDateToDbFormat(toDate),
      userName: props.userData.userName,
      appliedDate: getDateFormat(new Date()),
      approvedDate: null,
      approvedFlag: "N",
    };

    const url = "http://localhost:8080/api/leave/";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(payload),
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((result) => {
        if (result.requestId) {
          alert("Details saved successfully.");
          setLeaveData({});
        } else {
          alert("Error while applying the data.");
        }
      });
  }

  function getDatePickerComponent(key, value, minDate) {
    return (
      <ReactDatePicker
        className="form-control"
        showYearDropdown
        minDate={minDate}
        showMonthDropdown
        dropdownMode="select"
        value={value}
        // selected={}
        dateFormat="dd/MM/yyyy"
        onChange={(date) => {
          handleOnChange(key, getDateFormat(date));
        }}
      />
    );
  }

  return (
    <div>
      <NavBar />
      <div
        style={{
          height: "inherit",
          width: "inherit",
          backgroundColor: "white",
          borderRadius: "25px",
          borderStyle: "groove",
          marginLeft: "inherit",
          marginTop: "48px",
          padding: "20px",
        }}
      >
        <center>
          <label> Apply For Leave</label>
        </center>
        <div className="mb-3" style={{ width: "inherit" }}>
          <label>
            <h6>From date: </h6>
          </label>
          <div style={{ width: "300px" }}>
            {getDatePickerComponent("fromDate", leaveData.fromDate, new Date())}
          </div>
        </div>
        <div className="mb-3">
          <label>
            <h6>To date: </h6>
          </label>
          <div style={{ width: "300px" }}>
            {getDatePickerComponent(
              "toDate",
              leaveData.toDate,
              leaveData.fromDate
            )}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="reason">
            <h6>Reason:</h6>{" "}
          </label>
          <div style={{ width: "300px" }}>
            <textarea
              className="form-control"
              placeholder="Enter reason"
              value={leaveData.reason}
              onChange={(event) => {
                handleOnChange("reason", event.target.value);
              }}
            />
          </div>
        </div>
        <div style={{ marginTop: "10px", width: "300px" }} className="d-grid">
          <button className="btn btn-primary" onClick={handleOnSubmit}>
            Apply for leave
          </button>
        </div>
      </div>
    </div>
  );
};

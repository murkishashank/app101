import React, { useContext, useEffect, useState } from "react";
import { LeaveCard } from "./LeaveCard";
import { NavBar } from "./NavBar";
import "./CommonStyling.css";
import Button from "react-bootstrap/Button";
import { LeaveForm } from "./LeaveForm";

export const Home = () => {
  const [leaveData, setLeaveData] = useState([]);
  const [leaveDataLoading, setLeaveDataLoading] = useState(true);
  const [index, setIndex] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [formData, setFormData] = useState({
    reason: "",
    fromDate: "",
    toDate: "",
    leaveType: "",
  });
  const [errorObject, setErrorObject] = useState({
    reason: "",
    fromDate: "",
    toDate: "",
    leaveType: "",
  });
  let userName = "Sai123"

  useEffect(() => {
    setLeaveDataLoading(true);
    fetch(`http://localhost:8080/api/userLeave/${userName}`, { method: "GET" })
      .then((response) => response.json())
      .then((result) => {
        setLeaveData(result);
        setLeaveDataLoading(false);
      });
  }, [userName]);

  const handleOnChange = (event) => {
    formData[event.target.name] = event.target.value;
  };

  const convertDateToDbFormat = (date) => {
    return date.split("/").reverse().join("-");
  };

  const getDateFormat = (date) => {
    return new Date(date).toLocaleDateString("fr-FR");
  };

  const validateField = (payload) => {
    const keys = Object.keys(payload);
    const errorObjectClone = { ...errorObject };
    let isDataValid = true;
    keys.forEach((key) => {
      if (
        payload[key] === "" ||
        payload[key] === null ||
        payload[key] === undefined
      ) {
        if (key !== "approvedFlag" && key !== "approvedDate") {
          errorObjectClone[key] = `${key} is required`;
          setErrorObject(errorObjectClone);
          setModalShow(true);
          isDataValid = false;
          return isDataValid;
        }
      } else {
        errorObjectClone[key] = "";
        setErrorObject(errorObjectClone);
      }
    });
    return isDataValid;
  };

  const handleSubmit = () => {
    const { fromDate, toDate, reason, leaveType } = formData;
    const payload = {
      fromDate: fromDate,
      toDate: toDate,
      reason: reason,
      userName: userName,
      appliedDate: convertDateToDbFormat(getDateFormat(new Date())),
      approvedDate: null,
      approvedFlag: "",
      leaveType: leaveType,
    };
    const isValid = validateField(payload);
    if (isValid) {
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
            // alert("Details saved successfully.");
            setModalShow(false);
            setIndex(null);
            leaveData.push(payload);
            setFormData({
              reason: "",
              fromDate: "",
              toDate: "",
              leaveType: "",
            });
          } else {
            alert("Error while applying the data.");
          }
        });
    } else {
      alert("Enter all the required fields.");
    }
  };

  const handleEdit = (key) => {
    setIndex(key);
    setFormData(leaveData[key]);
    setModalShow(true);
  };

  return (
    <>
      <NavBar></NavBar>
      {leaveDataLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <Button onClick={() => setModalShow(true)}>Apply for leave</Button>
          <LeaveForm
            show={modalShow}
            onHide={() => {
              setModalShow(false);
              setIndex(null)
            }}
            onChange={handleOnChange}
            onSubmit={handleSubmit}
            errorObject={errorObject}
            leaveObj={index !== null ? leaveData[index] : leaveData}
          />
          {leaveData.map((leaveitem, key) => {
            return (
              <div className="leaveCard">
                <LeaveCard
                  leaveData={leaveitem}
                  onEdit={handleEdit}
                  index={key}
                ></LeaveCard>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

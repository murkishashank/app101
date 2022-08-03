import React, { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import "../css/CommonStyling.css";
import Button from "react-bootstrap/Button";
import { LeaveForm } from "../components/LeaveForm";
import { DataTable } from "../components/DataTable";
import { leavesColDefs } from "./leavesColDefs";
import { getLeavedById } from "../api/getLeavesById";
import { saveLeave } from "../api/saveLeave";

export const Home = (props) => {
  const userId = localStorage.getItem("userID");
  const dataObj = {
    userId: userId,
    reason: "",
    fromDate: "",
    toDate: "",
    leaveType: "",
    appliedDate: "",
    approvedFlag: "",
    approvedDate: "",
    remarks: "",
  };
  const [leaveData, setLeaveData] = useState([]);
  const [leaveDataLoading, setLeaveDataLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [formData, setFormData] = useState(dataObj);
  const [errorObject, setErrorObject] = useState(dataObj);

  useEffect(() => {
    setLeaveDataLoading(true);
    getLeavedById(userId).then((response) => {
      setLeaveData(response);
      setLeaveDataLoading(false);
    });
  }, [userId]);

  const handleOnChange = (event) => {
    const formDataClone = { ...formData };
    formDataClone[event.target.name] = event.target.value;
    setFormData(formDataClone);
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
        if (
          key !== "approvedFlag" &&
          key !== "approvedDate" &&
          key !== "remarks"
        ) {
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
    if (!formData.id) {
      formData["appliedDate"] = convertDateToDbFormat(
        getDateFormat(new Date())
      );
    }
    const { userName, ...payload } = formData;
    const isValid = validateField(payload);
    if (isValid) {
      saveLeave(payload)
        .then((response) => {
          console.log(response);
          if (response.id) {
            setModalShow(false);
            setFormData(dataObj);
          } else {
            alert("Error while applying the data.");
          }
        })
        .catch((error) => console.log);
    } else {
      alert("Enter all the required fields.");
    }
  };

  const handleCellEditBtn = (params) => {
    setFormData(params.row);
    setModalShow(true);
  };

  return (
    <>
      {leaveDataLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <Button variant="secondary" onClick={() => setModalShow(true)}>
            Apply for leave
          </Button>
          <LeaveForm
            show={modalShow}
            onHide={() => {
              setFormData(dataObj);
              setErrorObject(dataObj);
              setModalShow(false);
            }}
            onChange={handleOnChange}
            onSubmit={handleSubmit}
            errorobject={errorObject}
            leaveobj={formData}
          />
          <DataTable
            rowData={leaveData}
            colData={leavesColDefs}
            onClickEdit={handleCellEditBtn}
          ></DataTable>
        </div>
      )}
    </>
  );
};

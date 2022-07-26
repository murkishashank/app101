import React, { useEffect, useState } from "react";
import "../css/CommonStyling.css";
import { LeaveForm } from "../components/LeaveForm";
import { DataTable } from "../components/DataTable";
import { leavesColDefs } from "./leavesColDefs";
import { getLeavesById } from "../api/getLeavesById";
import { saveProcessedLeave } from "../api/saveProcessedLeave";
import { CircularProgress, Container, Button, Box } from "@mui/material";

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
    getLeavesById(userId)
      .then((response) => {
        setLeaveData(response);
        setLeaveDataLoading(false);
      })
      .catch((error) => console.log);
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
        let fromDate = payload.fromDate;
        let toDate = payload.toDate;
        errorObjectClone[key] = "";
        if (key === "toDate") {
          errorObjectClone[key] = `${key} must by greater than fromDate`;
          let isDateValid;
          isDateValid = fromDate <= toDate;
          if (isDateValid) {
            errorObjectClone[key] = "";
          }
          return isDataValid;
        }
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
      saveProcessedLeave(payload)
        .then((response) => {
          if (response.id) {
            let leaveDataClone = [...leaveData];
            leaveDataClone.push(response);
            setLeaveData(leaveDataClone);
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
    <Container fixed disableGutters component="main" sx={{ pt: 4, pb: 4 }}>
      {leaveDataLoading ? (
        <CircularProgress />
      ) : (
        <div>
          <Box
            component="span"
            m={1}
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <Button onClick={() => setModalShow(true)}>Apply for leave</Button>
          </Box>
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
            rowId={"id"}
          />
        </div>
      )}
    </Container>
  );
};

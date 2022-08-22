import React, { useEffect, useState } from "react";
import { NavBar } from "../../components/NavBar";
import "../../css/CommonStyling.css";
import { TaskForm } from "./TaskForm.js";
import { DataGrid } from "@mui/x-data-grid";
import { taskColDefs } from "./TaskColDefs";
import { getAllTasks } from "../../api/getAllTasks";
import { Box, Button } from "@mui/material";
import {
  convertDateToDbFormat,
  getDateFormat,
} from "../../utils/getDateFormat";
import { getAllUserIds } from "../../api/getAllUserIds";
import { getIdByUserName } from "../../utils/getUserNameById";
import { DataTable } from "../../components/DataTable";

export const Task = () => {
  const userId = localStorage.getItem("userID");
  const initialWorkData = {
    userId: "",
    taskName: "",
    taskDescription: "",
    taskStatus: "",
    assignedBy: userId,
    taskAssignedDate: convertDateToDbFormat(getDateFormat(new Date())),
  };

  const [allTasksData, setAllTasksData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [users, setUsers] = useState();
  const [workData, setWorkData] = useState(initialWorkData);
  const [errorObj, setErrorObj] = useState(initialWorkData);

  const handleOnChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    const workDataClone = { ...workData };
    if (name === "userName") {
      workDataClone["userId"] = getIdByUserName(users, value);
    } else {
      workDataClone[name] = value;
    }
    setWorkData(workDataClone);
  };

  const validateField = (payload) => {
    const keys = Object.keys(payload);
    const errorObjClone = { ...errorObj };
    let isDataValid = true;
    keys.forEach((key) => {
      if (
        payload[key] === "" ||
        payload[key] === null ||
        payload[key] === undefined
      ) {
        errorObjClone[key] = `${key} is required`;
        setErrorObj(errorObjClone);
        isDataValid = false;
        return isDataValid;
      } else {
        errorObjClone[key] = "";
        setErrorObj(errorObjClone);
      }
    });
    return isDataValid;
  };

  const fetchAllTasks = () => {
    getAllTasks()
      .then((data) => {
        setAllTasksData(data);
        setDataLoading(false);
      })
      .catch(console.log);
  };

  const handleCellEditBtn = (params) => {
    setIsEditing(true);
    setWorkData(params.row);
    setModalShow(true);
  };

  const handleSave = () => {
    let payload;
    let isValid;
    if (isEditing) {
      payload = [workData];
      isValid = validateField(payload[0]);
    } else {
      payload = allTasksData.filter((row) => row.editStatus);
      isValid = true;
    }
    if (isValid) {
      const url = "http://localhost:8080/api/tasks";
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
          if (result[0].statusId) {
            fetchAllTasks();
            setModalShow(false);
            setWorkData(initialWorkData);
          } else {
            alert("Error while applying the data task.");
          }
        })
        .catch(console.log);
    }
  };

  const handleCellChange = (event) => {
    const { id, field, value } = event;
    const allTasksDataClone = allTasksData.map((row) => {
      if (row.statusId === id) {
        return {
          ...row,
          [field]: value,
          ...(field === "taskStatus" && {
            completedTimeStamp:
              value === "Completed" ? getDateFormat(new Date()) : "On progress",
          }),
          editStatus: true,
        };
      }
      return row;
    });
    setAllTasksData(allTasksDataClone);
  };

  const newRecord = () => {
    setIsEditing(true);
    setModalShow(true);
    setWorkData(initialWorkData);
  };

  const getAllUsers = () => {
    getAllUserIds()
      .then((response) => setUsers(response))
      .catch(console.log);
  };

  useEffect(() => {
    fetchAllTasks();
    getAllUsers();
  }, []);

  return (
    <div>
      {dataLoading ? (
        <h1>Loading</h1>
      ) : (
        <div>
          <NavBar></NavBar>
          <div style={{ height: 500, width: "inherit" }}>
            <div>
              <Button variant="secondary" onClick={newRecord}>
                Add New Task
              </Button>
              <TaskForm
                show={modalShow}
                onHide={() => {
                  setIsEditing(false);
                  setModalShow(false);
                  setErrorObj(initialWorkData);
                }}
                onChange={handleOnChange}
                onSubmit={handleSave}
                taskobj={workData}
                errorobj={errorObj}
              />
              <Button
                variant="secondary"
                className="editbtn"
                onClick={handleSave}
              >
                Save
              </Button>
            </div>
            <Box
              sx={{
                width: "100%",
                "& .super-app-theme--header": {
                  backgroundColor: "rgba(255, 7, 0, 0.55)",
                },
                height: 300,
                width: "100%",
                "& .super-app-theme--cell": {
                  backgroundColor: "rgba(224, 183, 60, 0.55)",
                  color: "#AFF7F6",
                  fontWeight: "600",
                },
                "& .super-app.QA": {
                  backgroundColor: "#F75742",
                  color: "#1a3e72",
                  fontWeight: "600",
                },
                "& .super-app.pending": {
                  backgroundColor: "#FFF334",
                  color: "#1a3e72",
                  fontWeight: "600",
                },
                "& .super-app.completed": {
                  backgroundColor: "#38C43B",
                  color: "#1a3e72",
                  fontWeight: "600",
                },
              }}
            >
              <DataTable
                rowData={allTasksData}
                colData={taskColDefs}
                rowId={"statusId"}
                onCellEdit={handleCellChange}
                onClickEdit={handleCellEditBtn}
              ></DataTable>
            </Box>
          </div>
        </div>
      )}
    </div>
  );
};

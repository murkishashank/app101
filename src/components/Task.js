import React, { useContext, useEffect, useState } from "react";
import { TaskCard } from "../components/TaskCard";
import { NavBar } from "../components/NavBar";
import "../css/CommonStyling.css";
import Button from "react-bootstrap/Button";
import { TaskForm } from "../components/TaskForm.js";
import { LeaveForm } from "../components/LeaveForm";
import { getAllUserIds } from "../api/getAllUserIds";
import { DataGrid } from "@mui/x-data-grid";
import {taskColDefs} from "../components/TaskColDefs"
import { getAllTasks } from "../api/getAllTasks";


export const Task = () => {
  const [allTasksData, setAllTasksData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [taskFormDisplay, setTaskFormDisplay] = useState(false);
  const [editFlag, setEditFlag] = useState(false)

  const [workData, setWorkData] = useState({
    id: "",
    taskName: "",
    taskDescription: "",
    taskStatus: "",
    assignedBy: null,
    userId:null ,
  });

  const handleOnChange = (event) => {
    workData[event.target.name] = event.target.value;
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);


  const validateField = (payload) => {
    const keys = Object.keys(payload);
    let isDataValid = true;
    keys.forEach((key) => {
      if (
        payload[key] === "" ||
        payload[key] === null ||
        payload[key] === undefined
      ) {
          setTaskFormDisplay(true);
          isDataValid = false;
          return isDataValid;
      }
    });
    return isDataValid;
  };

  const fetchAllTasks = () => {
    getAllTasks().then((data) => {
        setAllTasksData(data);
        setDataLoading(false);
    });
  };

  const columns= [{
    field: "",
    type: "actions",
    headerName: "Actions",
    renderCell: (params) => {
      const onClick = () => {
       setTaskFormDisplay(true)
        setWorkData(params.row)
        setEditFlag(true)
      };
      return <Button variant="secondary" onClick={onClick}>Edit</Button>;
}},];

  const col = taskColDefs.concat(columns);

  const handleSubmit = () => {
    if(editFlag) {
      setWorkData(workData)
    }
    const { taskDescription, taskStatus, taskName, assignedBy, id , userId} = workData;

    const payload = {
      taskDescription: taskDescription,
      taskStatus: taskStatus,
      taskName: taskName,
      userId: userId,
      id: id,
      assignedBy: assignedBy,
    };
    
    const isValid = validateField(payload);
    if (isValid) {
      const url = "http://localhost:8080/api/task";
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
          if (result) {
            alert("Details saved successfully.");
            setTaskFormDisplay(false);
            if(!editFlag) {
                workData.push(payload);
            }
            setWorkData({
              taskName: "",
              taskDescription: "",
              taskStatus: "",
              assignedBy: "",
            });
          } else {
            alert("Error while applying the data task.");
          }
        });
    } else {
      alert("Enter all the required fields.");
    }
  };
  const getDateFormat = (date) => {
    return new Date(date).toLocaleDateString("fr-FR");
  };


  const handleCellChange = (event) => {
    const { id, field, value } = event;
    const allTasksDataClone = allTasksData.map((row) => {
      if (row.id === id) {
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

  const handleSave = () => {
    const editedRows = allTasksData.filter((row) => row.editStatus);
    const url = "http://localhost:8080/api/tasks";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(editedRows),
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((result) => {
        if (result.id) {
          alert("Details saved successfully.");
        } else {
            alert("Error while applying the data. post");
          }
        });
    };
    
  return (
    <div>
    {dataLoading ? <h1>Loading</h1>:
    <div>
      <NavBar></NavBar>
      <h5>All tasks</h5>
      <div style={{ height: 500, width: "inherit" }}>
        <div> <Button variant="secondary"  onClick={() => setTaskFormDisplay(true)}>Add New Task</Button>
       {taskFormDisplay &&
          <TaskForm
            show={taskFormDisplay}
            onHide={() => {
              setTaskFormDisplay(false);
            }}
            onChange={handleOnChange}
            onSubmit={handleSubmit}
            taskObj={workData}
          />}
          <Button variant="secondary" className="editbtn" onClick={handleSave}>
            Save
          </Button>
        </div>
        <DataGrid
          rows={allTasksData}
          columns={col}
          onCellEditCommit={handleCellChange}
        ></DataGrid>
      </div>
    </div>}
    </div>
  );
};
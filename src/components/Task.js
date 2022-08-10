import React, { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import "../css/CommonStyling.css";
import Button from "react-bootstrap/Button";
import { TaskForm } from "../components/TaskForm.js";
import { DataGrid } from "@mui/x-data-grid";
import {taskColDefs} from "../components/TaskColDefs"
import { getAllTasks } from "../api/getAllTasks";
import Box from '@mui/material/Box';

export const Task = () => {
  const [allTasksData, setAllTasksData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [taskFormDisplay, setTaskFormDisplay] = useState(false);
  const [editFlag, setEditFlag] = useState(false)
  const userName = localStorage.getItem("userName");


  const initialWorkData = {
    id: "",
    taskName: "",
    taskDescription: "",
    taskStatus: "Assigned",
    assignedBy: userName,
    userName:"" ,
    userId: "1",
    remarks: "",
    taskAssignedDate: "",
    taskCompletedDate: ""
  };
  const [workData, setWorkData] = useState(initialWorkData);

  const handleOnChange = (event) => {
    workData[event.target.name] = event.target.value;
  };

  const validateField = (payload) => {
    const keys = taskColDefs.map(colDef => {
      if(colDef.required === true){
      return colDef.field}
    }).filter(Boolean)
    let isDataValid = true;
    keys.forEach((key) => {
      if (
        payload[key] === "" ||
        payload[key] === null ||
        payload[key] === undefined
      ) {
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
    headerClassName: 'super-app-theme--header',
    renderCell: (params) => {
      const onClick = () => {
       setTaskFormDisplay(true)
        setWorkData(params.row)
        setEditFlag(true)
      };
      return <Button variant="secondary" onClick={onClick}>Edit</Button>;
}},];

  const col = taskColDefs.concat(columns);

  const handleUserId = (value) => {
    workData.userId= value
  }

  const handleSubmit = () => {
    if(editFlag) {
      setWorkData(workData)
    }
    const { taskDescription, taskStatus, taskName, assignedBy, id , userName, userId, remarks, taskAssignedDate, taskCompletedDate} = workData;

    const payload = {
      taskDescription: taskDescription,
      taskStatus: taskStatus,
      taskName: taskName,
      userName: userName,
      id: id,
      assignedBy: assignedBy,
      remarks: remarks,
      taskAssignedDate: taskAssignedDate,
      taskCompletedDate: taskCompletedDate,
      userId: userId
    };
    
    const isValid = validateField(payload);
    // const assignedId = localStorage.getItem("userID");
    if (isValid) {
      const url = "http://localhost:8080/api/tasks";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify([payload]),
      };
      fetch(url, options)
        .then((response) => response.json())
        .then((result) => {
          if (result) {
            alert("Details saved successfully.");
            setTaskFormDisplay(false);
            fetchAllTasks();
            setWorkData({
              taskName: "",
              taskDescription: "",
              taskStatus: "",
              assignedBy: "",
              userName: "",
            });
          } else {
            alert("Error while applying the data task.");
          }
        });
    } else {
      alert("Enter all the required fields.");
    }
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
        if (result) {
          alert("Details saved successfully.");
          setWorkData({
            taskName: "",
            taskDescription: "",
            taskStatus: "",
            assignedBy: "",
            userName: "",
          });
        } else {
            alert("Error while applying the data. post");
          }
        });
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
    const newRecord = () => {
      setTaskFormDisplay(true);
      setWorkData(initialWorkData)

    }
    useEffect(() => {
      fetchAllTasks();
    }, []);
    useEffect(() => {
    }, [allTasksData])
  return (
    <div>
    {dataLoading ? <h1>Loading</h1>:
    <div>
      <NavBar></NavBar>
      <h5>All tasks</h5>
      <div style={{ height: 500, width: "inherit" }}>
        <div> <Button variant="secondary"  onClick={newRecord}>Add New Task</Button>
       {taskFormDisplay &&
          <TaskForm
            show={taskFormDisplay}
            onHide={() => {
              setTaskFormDisplay(false);
            }}
            onChange={handleOnChange}
            onSubmit={handleSubmit}
            userID={handleUserId}
            taskObj={workData}
          />}
          <Button variant="secondary" className="editbtn" onClick={handleSave}>
            Save
          </Button>
        </div>
        <Box
      sx={{
        width: '100%',
        '& .super-app-theme--header': {
          backgroundColor: 'rgba(255, 7, 0, 0.55)',
        },
      height: 300,
      width: '100%',
      '& .super-app-theme--cell': {
        backgroundColor: 'rgba(224, 183, 60, 0.55)',
        color: '#AFF7F6',
        fontWeight: '600',
      },
      '& .super-app.QA': {
        backgroundColor: '#F75742',
        color: '#1a3e72',
        fontWeight: '600',
      },
      '& .super-app.pending': {
        backgroundColor: '#FFF334',
        color: '#1a3e72',
        fontWeight: '600',
      },
      '& .super-app.completed': {
        backgroundColor: '#38C43B',
        color: '#1a3e72',
        fontWeight: '600',
      },
    }}
    >
      <DataGrid
          rows={allTasksData}
          columns={col}
          onCellEditCommit={handleCellChange}
        ></DataGrid>
    </Box>
      </div>
    </div>}
    </div>
  );
};
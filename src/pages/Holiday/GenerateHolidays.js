import React, { useEffect, useState } from "react";
import { NavBar } from "../../components/NavBar";
import "../../css/CommonStyling.css";
import "../../css/App.css";
import Button from "react-bootstrap/Button";
import { DataGrid } from "@mui/x-data-grid";
import {holidayColDefs} from "../../components/HolidayColDefs"
import Box from '@mui/material/Box';
import { getAllHolidays } from "../../api/getAllHolidays";
import { HolidayForm } from "./HolidayForm.js";
import {companyOptions} from "../../components/HolidayColDefs"


export const GenerateHolidays = () => {
  const [dataLoading, setDataLoading] = useState(true);
  const [editFlag, setEditFlag] = useState(false)
  const [allHolidaysData, setAllHolidaysData] = useState([]);
  const [addHoliday, setHoliday] = useState(false)
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const userName = localStorage.getItem("userName");


  const initialWorkData = {
    id: "",
    occasion: "",
    date: "",
    day: "",
    company: "BOTH"
  };

  const [workData, setWorkData] = useState(initialWorkData);

  const handleOnChange = (event) => {
    workData[event.target.name] = event.target.value;
  };

  const validateField = (payload) => {
    const keys = holidayColDefs.map(colDef => {
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

  const fetchAllHolidays = () => {
    getAllHolidays().then((data) => {
        setAllHolidaysData(data);
        setDataLoading(false);
    });
  };


  const columns= [
    {
    field: "company",
    headerName: "Company Status",
    headerClassName: 'super-app-theme--header',
    type: "singleSelect",
    width: 200,
    valueOptions: companyOptions,
    editable: true,required: true
  },
];

  const col = holidayColDefs.concat(columns);

  const handleUserId = (value) => {
    workData.userId= value
  }


  const handleSave = () => {
    const editedRows = allHolidaysData.filter((row) => row.editStatus);
    const url = "http://localhost:8080/api/allHolidays";
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
          setHoliday(false)
          setWorkData({
            occasion: "",
            date: "",
            day: "",
            company: "",
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
      const allHolidaysDataClone = allHolidaysData.map((row) => {
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
      setAllHolidaysData(allHolidaysDataClone);
    };

    const addNewHoliday = () => {
        setHoliday(true);
        setWorkData(initialWorkData)
    }
      const handleSubmit = () => {
    if(editFlag) {
      setWorkData(workData)
    }
    const { occasion, date, day, company, id } = workData;
    let tempDay = new  Date(date)

    const payload = {
      occasion: occasion,
      date: date,
      day: weekday[tempDay.getDay()],
      company: company,
      id: id,
    };
    
    const isValid = validateField(payload);
    // const assignedId = localStorage.getItem("userID");
    if (isValid) {
      const url = "http://localhost:8080/api/allHolidays";
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
            fetchAllHolidays();
            setWorkData({
              occasion: "",
              date: "",
              day: "",
              company: "",
            });
          } else {
            alert("Error while applying the data.");
          }
        });
    } else {
      alert("Enter all the required fields.");
    }
  };
 
    useEffect(() => {
      fetchAllHolidays();
    }, []);
    useEffect(() => {
    }, [allHolidaysData])
  return (
    <div>
    {dataLoading ? <h1>Loading</h1>:
    <div>
      <NavBar></NavBar>
      <h5>All Holidays</h5>
      <div>
      <Button onClick = {addNewHoliday}>Add Holidays</Button>
      {addHoliday &&
          <HolidayForm
            show={addHoliday}
            onHide={() => {
              setHoliday(false);
            }}
            onChange={handleOnChange}
            onSubmit={handleSubmit}
            userID={handleUserId}
            dataObj={workData}
          />}
      <Button variant="secondary" className="editbtn" onClick={handleSave}>
            Save
          </Button>
          </div>
          <div>
      <div style={{ height: 500, width: "inherit" }}>  
      <DataGrid
          rows={allHolidaysData}
          columns={col}
          onCellEditCommit={handleCellChange}
        ></DataGrid>
      </div>
      </div>
    </div>}
    </div>
  );
};
import React, { useEffect, useState } from "react";
import { NavBar } from "../../components/NavBar";
import "../../css/CommonStyling.css";
// import { NavBar } from "../../components/NavBar";

import "../../css/App.css";
import Button from '@mui/material/Button';
import { getAllHolidays } from "../../api/getAllHolidays";
import { Link, useNavigate } from "react-router-dom";
import {holidayColDefs} from "../../components/HolidayColDefs"

export const Holidays = (props) => {
  const [allHolidaysData, setAllHolidaysData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  let company = props.userData.company;
  const navigate = useNavigate();
  let designation = props.userData.designation;
  console.log("props", props.userData.designation)
  const fetchAllHolidays = () => {
    getAllHolidays().then((data) => {
        setAllHolidaysData(data);
        setDataLoading(false);
    });
  };
   const addNewHolidays = () => {
    navigate("/addHolidays")
   }

  const filteredHolidays = allHolidaysData.map(colDef => {
    if((colDef.company === company) || (colDef.company === "Both")){
    return colDef}
  }).filter(Boolean)

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
        <div align = "center">
        {(designation === "HR") &&
        <Button onClick={addNewHolidays}><b>EDIT</b></Button>}
        </div>
        <div align="center" class= "padding">

        <h2 style={{height:50}}>Holidays</h2>
        </div>
        <table class = "center" align ="center">
          <tr>
            <th colspan="4" >Holidays under {company}</th>
          </tr>
          <tr>
            {holidayColDefs.map(( listValue ) => {
                return (
                  <td><b>{listValue.headerName}</b></td>
                );
            })}
          </tr>
          {filteredHolidays.map(( listValue, index ) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{listValue.occasion}</td>
                  <td>{listValue.date}</td>
                  <td>{listValue.day}</td>
                </tr>
              );
            })}
        </table>
      </div>}
    </div>
  );
};
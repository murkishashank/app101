import React, { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import "../css/CommonStyling.css";
import "../css/App.css";

import {holidayColDefs} from "../components/HolidayColDefs"
import { getAllHolidays } from "../api/getAllHolidays";

export const Holidays = (props) => {
  const [allHolidaysData, setAllHolidaysData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  let company = props.userData.company;

  const fetchAllHolidays = () => {
    getAllHolidays().then((data) => {
        setAllHolidaysData(data);
        setDataLoading(false);
    });
  };

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
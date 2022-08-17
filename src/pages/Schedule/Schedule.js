import { useEffect, useState } from "react";
import { NavBar } from "../../components/NavBar";
import {getDay, format, parse, startOfWeek} from "date-fns"
import Button from '@mui/material/Button';
import ReactDOM from 'react-dom/client';
import {Calendar, dateFnsLocalizer} from "react-big-calendar"
import {getSchedule} from "../../api/getSchedule"
import {ScheduleFor} from "../../api/ScheduleForm"


import "react-big-calendar/lib/css/react-big-calendar.css"


export const Schedule = () => {
  const userId = localStorage.getItem("userID");
  const [event, setEvent] = useState([]);
  const [addFlag, setAddFlag] = useState(false)
const locales = {
    'en-US': require("date-fns/locale/en-US")
}

const initialData = {
  scheduleId: "",
  title: "",
  start: "",
  end: "",
  userId: userId,
};
const [workData, setWorkData] = useState(initialData);
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales

})
const handleOnClick = () => {
  setAddFlag(true)
}

const handleOnChange = (event) => {
  workData[event.target.name] = event.target.value;
  console.log("eve", event)
};

const fetchSchedule = () => {
  getSchedule(userId).then((response) => {
    const keys = response.map(colDef => {
      let e = {
        title: colDef.title,
    start: new Date(colDef.start),
    end: new Date(colDef.end),
      }
    if(!(colDef.end)){
      e.end = new Date(colDef.start)
    }
      return e;
    }).filter(Boolean)
    setEvent(keys);
  })
  .catch(error => console.log);
};


const handleSubmit = () => {
  const { title, start, end, id , userId} = workData;

  const payload = {
    title: title,
    start: start,
    end: end,
    id: id,
    userId: userId
  };
  
  if (true) {
    const url = "http://localhost:8080/api/schedule";
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
          setAddFlag(false);
          fetchSchedule();
          setWorkData(initialData);
        } else {
          alert("Error while applying the data task.");
        }
      });
  } else {
    alert("Enter all the required fields.");
  }
};


useEffect(() => {
  fetchSchedule()
}, [userId]);

  return (<div>
    <NavBar/>
    <h1>Schedule</h1>
    {addFlag ? <ScheduleFor
       show={addFlag}
       onHide={() => {
         setAddFlag(false);
       }}
    onChange={handleOnChange}
    onSubmit={handleSubmit}
    taskObj={workData}
    />
    :<Button onClick = {handleOnClick}>Add Event</Button>}
    <div></div>
    <div className ="App">
        <Calendar localizer={localizer} events={event} startAccessor = "start" endAccessor ="end" style ={{height: 500, marginTop: "50px"}}/>
    </div>
  </div>
    
  );
};

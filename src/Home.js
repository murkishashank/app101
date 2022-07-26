import React, { useEffect, useState } from "react";
import { LeaveCard } from "./LeaveCard";
import { NavBar } from "./NavBar";
import "./CommonStyling.css";

export const Home = () => {
  // const leaveData = [
  //   {
  //     appliedOn: "25-07-2022",
  //     reason: "Applying a leave for sick ",
  //     AppliedOn: "25-07-2022",
  //     fromDate: "26-07-2022",
  //     toDate: "26-07-2022",
  //     status: "Approved",
  //   },
  //   {
  //     appliedOn: "26-07-2022",
  //     reason: "Applying a leave for sick",
  //     AppliedOn: "26-08-2022",
  //     fromDate: "27-08-2022",
  //     toDate: "27-08-2022",
  //     status: "Rejected",
  //   },
  // ];

  const [leaveData, setLeaveData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/allLeaves/', { method: "GET" })
    .then((response) => response.json())
    .then(result => {
      console.log("result", result)
      setLeaveData(result);
    })
  }, [])

  return (
    <>
      <NavBar></NavBar>
      {leaveData.map((leaveitem) => {
        return <div className="leaveCard">
          <LeaveCard leaveData={leaveitem}></LeaveCard>
        </div>;
      })}
    </>
  );
};

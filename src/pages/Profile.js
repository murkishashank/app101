import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NavBar } from "../components/NavBar";

export const Profile = (props) => {
  const userName = props.userData.userName
  const navigate = useNavigate();

  return (
    <>
      <NavBar></NavBar>
      <div style={{
        marginLeft: "100px",
        marginTop: "20px",
        padding: "22px",
      }}>
        <img src="../image.jpg" alt="Avatar" style={{ width: "110px", height: "100px", borderRadius: "50%" }}></img>
        <input className="form-control" style={{ border: "none" }} type="text" value={userName} />
        <button className="btn btn-primary" type="edit" onClick={() => { navigate("/editProfile") }}>Edit Profile</button>
        <button className="btn btn-primary" style={{ marginLeft: "300px" }} type="logout" onClick={() => { navigate("/") }}>
          Logout
        </button>
      </div>
    </>
  );
};

// requestID
// userId
// fromDate
// toDate
// reason
// createTimeStamp
// changeTimeStamp
// statusFlag

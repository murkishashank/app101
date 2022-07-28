import React, { useState, useEffect } from "react";
import { postUser } from "../api/postUser"
import { getUser } from "../api/getUserByUserName"
import { useNavigate, useParams } from "react-router-dom";

export const EditProfile = (props) => {

    const [userData, setUserData] = useState({});
    const { userName, firstName, lastName, age, mobileNumber } = userData
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = getUser(props.userData.userName);
        user.then((data) => {
            setUserData(data);
        })
    }, [])
    const saveUser = () => {
        setEditMode(true)
        const saveUserInfo = postUser(userData)
        saveUserInfo.then(response => {
            if (response) {
                alert("User updated successfully");
                navigate("/Profile")
            }
        })
    }
    const handleOnChange = (key, value) => {

        const userDataClone = { ...userData, [key]: value }
        setUserData(userDataClone)
    }
    return (
        <div>
            <h1> Edit </h1>
            <div style={{
                height: 450,
                width: 500,
                backgroundColor: "black",
                color: "white",
                borderRadius: "25px",
                borderColor: "white",
                borderStyle: "groove",
                marginLeft: "100px",
                marginTop: "20px",
                padding: "22px",

            }}>
                <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input className="form-control" type="firstname" value={firstName} readOnly={editMode}
                        onChange={(event) => handleOnChange("firstName", event.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input className="form-control" type="lastname" value={lastName} readOnly={editMode}
                        onChange={(event) => handleOnChange("lastName", event.target.value)} />
                </div>

                <div className="mb-3" >
                    <label className="form-label">Phone</label>
                    <input className="form-control" type="phone" value={mobileNumber} readOnly={editMode}
                        onChange={(event) => handleOnChange("mobileNumber", event.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input className="form-control" type="age" value={age} readOnly={editMode}
                        onChange={(event) => handleOnChange("age", event.target.value)} />
                </div>

                <button className="btn btn-primary" style={{ marginLeft: "20px" }} type="save" onClick={saveUser}> Save </button>
                <button className="btn btn-primary" style={{ marginLeft: "20px" }} onClick={() => { navigate("/profile") }}> Cancel</button>
            </div>
        </div>
    )
}
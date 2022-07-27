import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NavBar } from "./NavBar";

export const Profile = () => {
  const [userData, setUserData] = useState({});
  const [editMode, setEditMode] = useState(true);
  const { userName, firstName, lastName, age, mobileNumber } = userData
  const navigate = useNavigate();
  useEffect(() => {

    const user = getUser("Suresh");
    user.then((data) => {
      setUserData(data);
    })
  }, [])
  const saveUser = () => {
    setEditMode(true)
    const saveUserInfo = postUser(userData);
    saveUserInfo.then(response => {
      if (response) {
        alert("User updated successfully");
      }
    })
  }
  const handleOnChange = (key, value) => {
    const userDataClone = { ...userData, [key]: value }
    setUserData(userDataClone)
  }
  console.log("User", userData)
  return (
    <>
      <h1>Profile</h1>
      <NavBar></NavBar>
      <div style={{
        height: 500,
        width: 700,
        backgroundColor: "black",
        color: "white",
        borderRadius: "25px",
        borderColor: "white",
        borderStyle: "groove",
        marginLeft: "100px",
        marginTop: "32px",
        padding: "22px",

      }}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="username" value={userName} readOnly={editMode}
            onChange={(event) => handleOnChange("userName", event.target.value)} />
        </Form.Group>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="firstname" value={firstName} readOnly={editMode}
              onChange={(event) => handleOnChange("firstName", event.target.value)} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="lastname" value={lastName} readOnly={editMode}
              onChange={(event) => handleOnChange("lastName", event.target.value)} />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="phone" value={mobileNumber} readOnly={editMode}
            onChange={(event) => handleOnChange("mobileNumber", event.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicAge">
          <Form.Label>Age</Form.Label>
          <Form.Control type="age" placeholder="Age" value={age} readOnly={editMode}
            onChange={(event) => handleOnChange("age", event.target.value)} />
        </Form.Group>
        <div style={{
          marginTop: "50px"
        }}>
          <Button mode="contained" variant="primary" type="edit" onClick={() => setEditMode(false)}>
            Edit
          </Button>
          {
            !editMode && <Button mode="contained" style={{ marginLeft: "20px" }} variant="primary" type="save" onClick={saveUser}> Save </Button>
          }
          <Button mode="contained" style={{ marginLeft: "300px" }} variant="primary" type="edit" onClick={() => { navigate("/") }}>
            Logout
          </Button>
        </div>
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

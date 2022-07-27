import React, { useState, useEffect } from "react";
import { NavBar } from "./NavBar";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import getUser from "./api/getUserByUserName";
import postUser from "./api/postUser";

export const Profile = () => {
  const [userData, setUserData] = useState({});
  const [editMode, setEditMode] = useState(true);
  const { userName, firstName, lastName, age, mobileNumber } = userData
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
      console.log(response)
      // if (response.status === 200) {
      //   console.log("201");
      //   alert("Team Created Sucessfully ! Click on team Preview button To view your team.");
      // }
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
      <div>
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
        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Button variant="primary" type="edit" onClick={() => setEditMode(false)}>
          Edit
        </Button>
        {
          !editMode && <Button variant="primary" type="save" onClick={saveUser}>
            Save
          </Button>

        }
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

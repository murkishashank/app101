import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { postUser } from "../api/postUser"
import { getUser } from "../api/getUserByUserName"
import { NavBar } from "../components/NavBar";
import Image from "react-bootstrap/Image";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { EditProfileComponent } from "../components/EditProfileComponent";

export const Profile = (props) => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const user = getUser(props.userData.userName)
    user.then((data) => {
      setUserData(data);
    });
  }, [props])

  const { userName, firstName, lastName, dateOfBirth, mobileNumber, emailId, personalEmailId, alternativeMobileNumber,
    permanentAddress, contactAddress, reportingManager, joiningDate, designation } = userData
  const [editMode, setEditMode] = useState(true);

  const saveUser = () => {
    setEditMode(true)
    const saveUserInfo = postUser(userData)
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
  const [show, setShow] = useState(false);

  return (
    <div style={{ backgroundColor: "#eee" }}>
      <NavBar ></NavBar>
      <Container className="py-3">
        <Form as={Row} className="mb-4 p-2" style={{ backgroundColor: "white", borderRadius: "10px", width: '55rem' }}>
          <Form.Label style={{ fontWeight: "bold", fontSize: "20px" }}>Personal Details</Form.Label>
          <Col sm={3} className="text-center">
            <Image alt="avatar" className="rounded-circle" src="../image.jpg" style={{ width: "150px" }} fluid />
            <Form.Label className="d-flex justify-content-center mt-2">{props.userData.userName}</Form.Label>
            <Button variant="outline-primary" className="ms-1" onClick={() => setShow(true)}>Request Edit</Button>
            <EditProfileComponent show={show} userData={userData} onHide={() => { setShow(false) }}></EditProfileComponent>
          </Col>
          <Col sm={9}>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalFirstName">
              <Form.Label column sm={3}>First Name</Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="firstName" value={firstName} readOnly={editMode}
                  onChange={(event) => handleOnChange("firstName", event.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formGroupLastName">
              <Form.Label column sm={3}>Last Name</Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="lastName" value={lastName} readOnly={editMode}
                  onChange={(event) => handleOnChange("lastName", event.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formGroupAge">
              <Form.Label column sm={3}>DOB </Form.Label>
              <Col sm={9}>
                <Form.Control type="date" value={dateOfBirth} readOnly={editMode}
                  onChange={(event) => handleOnChange("dateOfBirth", event.target.value)} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formGroupPersonalEmail">
              <Form.Label column sm={3}>Personal Email</Form.Label>
              <Col sm={9}>
                <Form.Control type="email" value={personalEmailId} readOnly={editMode}
                  onChange={(event) => handleOnChange("personalEmailId", event.target.value)} />
              </Col>
            </Form.Group>
          </Col>
        </Form>
        <Form as={Row} className="mb-4 p-2" style={{ backgroundColor: "white", borderRadius: "10px", width: '55rem' }}>
          <Form.Label style={{ fontWeight: "bold", fontSize: "20px" }}>Contact Details</Form.Label>
          <Form.Group as={Row} className="mb-3" controlId="formGroupPermanentAddress">
            <Form.Label column sm={4}>Permanent Address</Form.Label>
            <Col sm={8}>
              <Form.Control as={"textarea"} rows={5} type="address" value={permanentAddress}></Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formGroupPersonalEmail">
            <Form.Label column sm={4}>Contact Address</Form.Label>
            <Col sm={8}>
              <Form.Control as={"textarea"} rows={5} type="address" value={contactAddress}></Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="horizontalFormMobileNumber">
            <Form.Label column sm={4}>Mobile Number</Form.Label>
            <Col sm={8}>
              <Form.Control type="number" value={mobileNumber} readOnly={editMode}
                onChange={(event) => handleOnChange("mobileNumber", event.target.value)} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="horizontalFormNumber">
            <Form.Label column sm={4}>Alternative Mobile Number</Form.Label>
            <Col sm={8}>
              <Form.Control type="number" value={alternativeMobileNumber} readOnly={editMode}
                onChange={(event) => handleOnChange("alternativeMobileNumber", event.target.value)} />
            </Col>
          </Form.Group>
        </Form>
        <Form as={Row} className="mb-4 p-2" style={{ backgroundColor: "white", borderRadius: "10px", width: '55rem' }}>
          <Form.Label style={{ fontWeight: "bold", fontSize: "20px" }}>Employee Details</Form.Label>
          <Form.Group as={Row} className="mb-3" controlId="formGroupJoinDate">
            <Form.Label column sm={4} >Joining Date</Form.Label>
            <Col sm={8}>
              <Form.Control type="date" value={joiningDate} readOnly={true} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formGroupName">
            <Form.Label column sm={4}>Reporting Manager</Form.Label>
            <Col sm={8}>
              <Form.Control type="text" value={reportingManager} readOnly={true} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formGroupDesignation">
            <Form.Label column sm={4}>Designation</Form.Label>
            <Col sm={8}>
              <Form.Control type="text" value={designation} readOnly={true} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formGroupEmail">
            <Form.Label column sm={4}>Email</Form.Label>
            <Col sm={8}>
              <Form.Control type="email" value={emailId} readOnly={true} />
            </Col>
          </Form.Group>
        </Form>
      </Container>
    </div>
  )

}

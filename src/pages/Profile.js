import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';
import { postUser } from "../api/postUser"
import { getUser } from "../api/getUserByUserName"
import { useNavigate } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import Image from "react-bootstrap/Image";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const Profile = (props) => {
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const [userData, setUserData] = useState({});
  const { userName, firstName, lastName, dateOfBirth, mobileNumber, emailId, personalEmailId, alternativeMobileNumber,
    permanentAddress, contactAddress, reportingManager, joiningDate, designation } = userData
  const [editMode, setEditMode] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const user = getUser(props.userData.userName);
    user.then((data) => {
      setUserData(data);
    })
  }, [props])

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
  return (

    <Container style={{ backgroundColor: "transparent" }}>
      <NavBar></NavBar>
      <Row style={{ marginTop: "20px", fontWeight: "lighter", width: "1200px" }}>
        <Col style={{ border: "groove" }}>

          <Form.Label className=" d-flex justify-content-center" style={{ fontSize: "20px" }}>Personal Details</Form.Label>
          <div className=" d-flex justify-content-center">
            <Image src="../image.jpg" style={{ width: "110px", height: "100px", borderRadius: "50%" }} />
          </div>
          <Form.Label className=" d-flex justify-content-center">{userName}</Form.Label>
          <Col>
            {editMode &&
              (<>
                <Button variant="primary" onClick={() => { setEditMode(false) }}>
                  Edit Profile
                </Button>

              </>
              )
            }

            {editMode === false &&
              (<>
                <Button variant="primary" onClick={saveUser}>Save</Button>
                <Button variant="secondary" style={{ marginLeft: "200px" }} onClick={() => { setEditMode(true) }}>Cancel</Button>
              </>)
            }

          </Col>
          <Form>
            <Form.Group className="mb-3" controlId="formGroupFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="firstName" value={firstName} readOnly={editMode}
                onChange={(event) => handleOnChange("firstName", event.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="lastName" value={lastName} readOnly={editMode}
                onChange={(event) => handleOnChange("lastName", event.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupAge">
              <Form.Label>DOB: {dateOfBirth}</Form.Label>
              <Form.Control type="date" value={dateOfBirth} readOnly={editMode}
                onChange={(event) => handleOnChange("dateOfBirth", event.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPersonalEmail">
              <Form.Label>Personal Email</Form.Label>
              <Form.Control type="email" value={personalEmailId} readOnly={editMode}
                onChange={(event) => handleOnChange("personalEmailId", event.target.value)} />
            </Form.Group>
          </Form>
        </Col>
        <Col style={{ border: "groove" }}>
          <Form>
            <Form.Label className=" d-flex justify-content-center" style={{ fontSize: "20px" }}>Contact Details</Form.Label>

            <Form.Group>
              <Form.Label>Permanent Address</Form.Label>
              <Form.Control as={"textarea"} rows={5} type="address" value={permanentAddress}></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Contact Address</Form.Label>
              <Form.Control as={"textarea"} rows={5} type="address" value={contactAddress}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPhone">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control type="phone" value={mobileNumber} readOnly={editMode}
                onChange={(event) => handleOnChange("mobileNumber", event.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPhone">
              <Form.Label>Alternative Mobile Number</Form.Label>
              <Form.Control type="phone" value={alternativeMobileNumber} readOnly={editMode}
                onChange={(event) => handleOnChange("alternativeMobileNumber", event.target.value)} />
            </Form.Group>
          </Form>
        </Col>
        <Col style={{ border: "groove" }}>
          <Form>
            <Form.Label className=" d-flex justify-content-center" style={{ fontSize: "20px" }}>Employee Details</Form.Label>
            <Form.Group className="mb-3" controlId="formGroupJoinDate">
              <Form.Label>Joining Date</Form.Label>
              <Form.Control type="date" value={joiningDate} readOnly={true} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupName">
              <Form.Label>Reporting Manager</Form.Label>
              <Form.Control type="name" value={reportingManager} readOnly={true} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupDesignation">
              <Form.Label>Designation</Form.Label>
              <Form.Control type="name" value={designation} readOnly={true} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={emailId} readOnly={true} />
            </Form.Group>
          </Form>
        </Col>

      </Row>

    </Container>
  )

}
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { postUser } from "../api/postUser";
import { getUser } from "../api/getUserByUserName";
import { useNavigate, useParams } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import Image from "react-bootstrap/Image";

export const Profile = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [userData, setUserData] = useState({});
  const { userName, firstName, lastName, age, mobileNumber } = userData;
  const [editMode, setEditMode] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const user = getUser(props.userData.userName);
    user.then((data) => {
      setUserData(data);
    });
  }, []);

  const saveUser = () => {
    setEditMode(true);
    const saveUserInfo = postUser(userData);
    saveUserInfo.then((response) => {
      if (response) {
        alert("User updated successfully");
        handleClose();
      }
    });
  };

  const handleOnChange = (key, value) => {
    const userDataClone = { ...userData, [key]: value };
    setUserData(userDataClone);
  };

  return (
    <>
      <NavBar></NavBar>
      <div style={{ marginTop: "20px", marginLeft: "20px" }}>
        <Button variant="primary" onClick={handleShow}>
          Edit Profile
        </Button>
        <Button
          style={{ marginLeft: "50px" }}
          variant="primary"
          onClick={() => {
            navigate("/");
          }}
        >
          Logout
        </Button>
        <Form>
          <Image
            src="../image.jpg"
            style={{
              marginTop: "50px",
              width: "110px",
              height: "100px",
              borderRadius: "50%",
            }}
          />
          <Form.Group>
            <Form.Label>{userName}</Form.Label>
          </Form.Group>
        </Form>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formGroupFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="firstName"
                value={firstName}
                readOnly={editMode}
                onChange={(event) =>
                  handleOnChange("firstName", event.target.value)
                }
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="lastName"
                value={lastName}
                readOnly={editMode}
                onChange={(event) =>
                  handleOnChange("lastName", event.target.value)
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="phone"
                value={mobileNumber}
                readOnly={editMode}
                onChange={(event) =>
                  handleOnChange("mobileNumber", event.target.value)
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="age"
                value={age}
                readOnly={editMode}
                onChange={(event) => handleOnChange("age", event.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

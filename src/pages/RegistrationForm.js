import { React, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { encrypt, decrypt } from "../utils/Encryption";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getUser } from "../api/getUserByUserName";
import { postUser } from "../api/postUser";
import { getUserById } from "../api/getUserById";

export const RegistrationForm = () => {
  const { userId = "new" } = { ...useParams() };
  const navigate = useNavigate();

  const initialState = {
    userName: "",
    password: "",
    firstName: "",
    lastName: "",
    mobileNumber: "",
    dateOfBirth: "",
    statusFlag: 0,
    dataLoading: true,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD":
        return {
          ...state,
          [action.payload.name]: action.payload.value,
        };
      case "NEW":
        return {
          ...state,
          userName: "",
          password: "",
          firstName: "",
          lastName: "",
          mobileNumber: "",
          dateOfBirth: "",
          statusFlag: 0,
          dataLoading: false,
        };
      default:
        break;
    }
  };

  const [updatedState, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "NEW" });
    // fetch(`http://localhost:8080/api/users/${userId}`, { method: "GET" })
    //   .then((response) => {
    //     return response.json();
    //   })
    getUserById()
      .then((result) => {
        if (result !== null) {
          if (result.password) {
            result.password = decrypt(result.password);
          }
          dispatch({ result, type: "EMPTY" });
        }
        dispatch({ type: "NEW" });
      })
      .catch(console.log);
  }, [userId]);

  const handleOnChange = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    const payload = { name, value };
    dispatch({ payload, type: "ADD" });
    updatedState.statusFlag = 0;
  };

  const handleSubmit = () => {
    const dataValues = Object.values(updatedState);

    const isUserNamePresent = 
    getUser(updatedState.userName)
      .then((result) => {
        if (result?.id) {
          alert("Username already in use.");
        }
      });
    if (dataValues.includes(null) || dataValues.includes("")) {
      alert("All fields are required");
    } else if (updatedState.mobileNumber.length !== 10) {
      alert("Enter valid phone number.");
    } else if (isUserNamePresent === true) {
      alert("Username already in use.");
    } else {
      updatedState.password = encrypt(updatedState.password);
      postUser(updatedState)
        .then((result) => {
          result.userName === updatedState.userName
            ? navigate("/")
            : alert("Error while saving the data.");
        });
    }
  };

  return (
    <>
      {updatedState.dataLoading ? (
        <h1> Form loading...</h1>
      ) : (
        <div
          style={{
            height: 600,
            width: 400,
            backgroundColor: "white",
            borderRadius: "25px",
            borderStyle: "groove",
            marginLeft: "500px",
            marginTop: "32px",
            padding: "22px",
          }}
        >
          <Form.Group className="mb-3">
            <Form.Label htmlFor="userName">
              <h6>User Name: </h6>
            </Form.Label>
            <Form.Control
              className="form-control"
              placeholder="userName"
              type="text"
              id="userName"
              name="userName"
              defaultValue={updatedState.userName}
              onChange={handleOnChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="password">
              <h6>Password: </h6>
            </Form.Label>
            <Form.Control
              className="form-control"
              placeholder="password"
              type="password"
              id="password"
              name="password"
              defaultValue={updatedState.password}
              onChange={handleOnChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="firstName">
              <h6>First Name: </h6>
            </Form.Label>
            <Form.Control
              className="form-control"
              placeholder="First name"
              type="text"
              id="firstName"
              name="firstName"
              defaultValue={updatedState.firstName}
              onChange={handleOnChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="lastName">
              <h6>Last Name: </h6>
            </Form.Label>
            <Form.Control
              className="form-control"
              placeholder="Last name"
              type="text"
              id="lastName"
              name="lastName"
              defaultValue={updatedState.lastName}
              onChange={handleOnChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="date">
              <h6>DOB: </h6>
            </Form.Label>
            <Form.Control
              className="form-control"
              type="date"
              placeholder="dd-mm-yyyy"
              id="date"
              name="dateOfBirth"
              defaultValue={updatedState.dateOfBirth}
              onChange={handleOnChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="phoneNumber">
              <h6>Phone Number: </h6>
            </Form.Label>
            <Form.Control
              className="form-control"
              type="tel"
              placeholder="mobileNumber"
              id="mobileNumber"
              name="mobileNumber"
              defaultValue={updatedState.mobileNumber}
              onChange={handleOnChange}
            />
          </Form.Group>
          <Form.Group style={{ marginTop: "10px" }} className="d-grid">
            <Button
              className="btn btn-secondary"
              id="submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Form.Group>
        </div>
      )}
    </>
  );
};

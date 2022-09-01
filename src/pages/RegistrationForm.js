import { React, useEffect, useReducer, useRef, useState } from "react";
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
  const imageRef = useRef();
  const [uploadStatus, setUploadStatus] = useState("Upload");

  const initialState = {
    userName: "",
    password: "",
    firstName: "",
    lastName: "",
    mobileNumber: "",
    dateOfBirth: "",
    statusFlag: 0,
    dataLoading: true,
    alternativeMobileNumber: "",
    personalEmailId: "",
    permanentAddress: "",
    contactAddress: "",
    addressProof: "",
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
          alternativeMobileNumber: "",
          personalEmailId: "",
          permanentAddress: "",
          contactAddress: "",
          addressProof: "",
        };
      default:
        break;
    }
  };

  const [updatedState, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "NEW" });
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
    var name = event.target.name;
    var value = event.target.value;
    const payload = { name, value };
    dispatch({ payload, type: "ADD" });
    updatedState.statusFlag = 0;
  };

  const handleSubmit = () => {
    const dataValues = Object.values(updatedState);

    const isUserNamePresent = getUser(updatedState.userName).then((result) => {
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
      postUser(updatedState).then((result) => {
        result.userName === updatedState.userName
          ? navigate("/")
          : alert("Error while saving the data.");
      });
    }
  };

  const handleUploadBtn = () => {
    var image = imageRef.current.files[0];
    let fr = new FileReader();
    fr.readAsDataURL(image);
    fr.onload = (event) => {
      if(event.target.result.includes("image")){
        var fileBase64 = event.target.result;
        updatedState.addressProof = fileBase64;
        if (updatedState.addressProof !== null) {
          setUploadStatus("Uploaded");
        }
      }
      else{
        alert("Only images are allowed.")
      }
    }

  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <>
      {updatedState.dataLoading ? (
        <h1> Form loading...</h1>
      ) : (
        <>
          <div
            style={{
              height: 560,
              width: 400,
              backgroundColor: "white",
              borderRadius: "25px",
              borderStyle: "groove",
              marginLeft: "100px",
              marginTop: "10px",
              padding: "22px",
            }}
          >
            <h3>Personal Details</h3>
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
          </div>
          <div
            style={{
              height: 560,
              width: 400,
              backgroundColor: "white",
              borderRadius: "25px",
              borderStyle: "groove",
              marginLeft: "530px",
              marginTop: "-560px",
              padding: "22px",
            }}
          >
            <h3>Communication Details</h3>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="contactAddress">
                <h6>Communication address: </h6>
              </Form.Label>
              <Form.Control
                className="form-control"
                placeholder="Contact Address"
                type="text"
                id="contactAddress"
                name="contactAddress"
                defaultValue={updatedState.contactAddress}
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="permanentAddress">
                <h6>Permanent address: </h6>
              </Form.Label>
              <Form.Control
                className="form-control"
                placeholder="Permanent Address"
                type="text"
                id="permanentAddress"
                name="permanentAddress"
                defaultValue={updatedState.permanentAddress}
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="mobileNumber">
                <h6>Phone Number: </h6>
              </Form.Label>
              <Form.Control
                className="form-control"
                type="tel"
                placeholder="Mobile Number"
                id="mobileNumber"
                name="mobileNumber"
                defaultValue={updatedState.mobileNumber}
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="alternativeMobileNumber">
                <h6>Alternate phone Number: </h6>
              </Form.Label>
              <Form.Control
                className="form-control"
                type="tel"
                placeholder="Alternate Mobile Number"
                id="alternativeMobileNumber"
                name="alternativeMobileNumber"
                defaultValue={updatedState.alternativeMobileNumber}
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="personalEmailId">
                <h6>Personal Email: </h6>
              </Form.Label>
              <Form.Control
                className="form-control"
                placeholder="Personal Email"
                type="email"
                id="personalEmailId"
                name="personalEmailId"
                defaultValue={updatedState.personalEmailId}
                onChange={handleOnChange}
              />
            </Form.Group>
          </div>
          <div
            style={{
              height: 160,
              width: 400,
              marginLeft: 950,
              marginTop: -560,
              backgroundColor: "white",
              borderRadius: "25px",
              borderStyle: "groove",

              padding: "22px",
            }}
          >
            <label
              style={{
                marginBottom: "10px",
                marginTop: "10px",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            >
              <h6>Upload address proof:</h6>
              <input
                type="file"
                name="addressProof"
                ref={imageRef}
                onChange={handleOnChange}
                style={{
                  marginRight: "10px",
                }}
              />
              <Button
                className="btn btn-secondary"
                id="submit"
                onClick={handleUploadBtn}
                style={{
                  marginTop: "10px"
                }}
              >
                {uploadStatus}
              </Button>
            </label>
          </div>
          <div
            style={{
              marginTop: "400px",
            }}
          >
            <Button
              className="btn btn-secondary"
              id="submit"
              onClick={handleSubmit}
              style={{ marginLeft: "1050px", marginTop: "10px" }}
            >
              Submit
            </Button>
            <Button
              className="btn btn-secondary"
              id="cancel"
              onClick={handleCancel}
              style={{ marginLeft: "1150px", marginTop: "-65px" }}
            >
              Cancel
            </Button>
          </div>
        </>
      )}
    </>
  );
};

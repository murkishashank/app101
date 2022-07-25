import { React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const RegistrationForm = () => {
  const { userId = "" } = { ...useParams() };
  const navigate = useNavigate();

  const [data, setData] = useState({
    userName: "",
    password: "",
    firstName: "",
    lastName: "",
    mobileNumber: "",
    age: null,
    statusFlag: 0,
  });

  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    setDataLoading(true);
    fetch(`http://localhost:8080/api/users/${userId}`, { method: "GET" })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result !== null) {
          setData(result);
        }
        setDataLoading(false);
      });
  }, [userId]);

  const handleOnChange = () => {
    data.userName = document.getElementById("userName").value;
    data.password = document.getElementById("password").value;
    data.firstName = document.getElementById("firstName").value;
    data.lastName = document.getElementById("lastName").value;
    data.age = parseInt(document.getElementById("age").value);
    data.mobileNumber = document.getElementById("phoneNumber").value;
    data.statusFlag = 0;
  };

  const handleSubmit = () => {
    const dataValues = Object.values(data);
    const isUserNamePresent = fetch(
      `http://localhost:8080/api/usersByUserName/${data.userName}`
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((result) => {
        if (result?.id) {
          alert("Username already in use.");
        }
      });
    if (dataValues.includes(null) || dataValues.includes("")) {
      alert("All fields are required");
    } else if (data.mobileNumber.length !== 10) {
      alert("Enter valid phone number.");
    } else if (isUserNamePresent === true) {
      alert("Username already in use.");
    } else {
      fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          result.userName === data.userName
            ? navigate("/users")
            : alert("Error while saving the data.");
        });
    }
  };

  return (
    <>
      {dataLoading ? (
        <h1> loading...</h1>
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
          <div className="mb-3">
            <label htmlFor="userName">
              <h6>User Name: </h6>
            </label>
            <input
              className="form-control"
              placeholder="userName"
              type="text"
              id="userName"
              name="userName"
              defaultValue={data.userName}
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <h6>Password: </h6>
            </label>
            <input
              className="form-control"
              placeholder="password"
              type="password"
              id="password"
              name="password"
              defaultValue={data.password}
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="firstName">
              <h6>First Name: </h6>
            </label>
            <input
              className="form-control"
              placeholder="First name"
              type="text"
              id="firstName"
              name="firstName"
              defaultValue={data.firstName}
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName">
              <h6>Last Name: </h6>
            </label>
            <input
              className="form-control"
              placeholder="Last name"
              type="text"
              id="lastName"
              name="lastName"
              defaultValue={data.lastName}
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age">
              <h6>Age: </h6>
            </label>
            <input
              className="form-control"
              type="number"
              placeholder="Age"
              id="age"
              name="age"
              defaultValue={data.age}
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phoneNumber">
              <h6>Phone Number: </h6>
            </label>
            <input
              className="form-control"
              type="tel"
              placeholder="phoneNumber"
              id="phoneNumber"
              name="phoneNumber"
              defaultValue={data.mobileNumber}
              onChange={handleOnChange}
            />
          </div>
          <div style={{ marginTop: "10px" }} className="d-grid">
            <button
              className="btn btn-primary"
              id="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
};

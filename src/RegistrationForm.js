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
        if (result.status !== 400) {
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
    if (dataValues.includes(null) || dataValues.includes("")) {
      alert("All fields are required");
      navigate("/registrationform/new");
    } else if (data.mobileNumber.length !== 10) {
      alert("Enter valid phone number.");
      navigate("/registrationform/new");
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
          console.log(result);
          if (Object.keys(result).length > 0) {
            console.log("result", result);
          }
        })
        .catch(console.log);
      navigate("/users");
    }
  };

  return (
    <>
      {dataLoading ? (
        <h1> loading...</h1>
      ) : (
        <form id="registrationForm">
          <ul>
            <label htmlFor="userName">User Name: </label>
            <input
              placeholder="userName"
              type="text"
              id="userName"
              name="userName"
              defaultValue={data.userName}
              onChange={handleOnChange}
            />
          </ul>
          <ul>
            <label htmlFor="password">Password: </label>
            <input
              placeholder="password"
              type="password"
              id="password"
              name="password"
              defaultValue={data.password}
              onChange={handleOnChange}
            />
          </ul>
          <ul>
            <label htmlFor="firstName">First Name: </label>
            <input
              placeholder="First name"
              type="text"
              id="firstName"
              name="firstName"
              defaultValue={data.firstName}
              onChange={handleOnChange}
            />
          </ul>
          <ul>
            <label htmlFor="lastName">Last Name: </label>
            <input
              placeholder="Last name"
              type="text"
              id="lastName"
              name="lastName"
              defaultValue={data.lastName}
              onChange={handleOnChange}
            />
          </ul>
          <ul>
            <label htmlFor="age">Age: </label>
            <input
              type="number"
              placeholder="Age"
              id="age"
              name="age"
              defaultValue={data.age}
              onChange={handleOnChange}
            />
          </ul>
          <ul>
            <label htmlFor="phoneNumber">Phone Number: </label>
            <input
              type="tel"
              placeholder="phoneNumber"
              id="phoneNumber"
              name="phoneNumber"
              defaultValue={data.mobileNumber}
              onChange={handleOnChange}
            />
          </ul>
          <button id="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      )}
    </>
  );
};

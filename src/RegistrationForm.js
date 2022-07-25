import { React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { encrypt, decrypt } from "./encryption";

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
          result.password = decrypt(result.password);
          setData(result);
        }
        setDataLoading(false);
      })
      .catch(console.log);
  }, [userId]);

  const handleOnChange = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    if (event.target.name === "userName") data.userName = value;
    if (name === "firstName") data.firstName = event.target.value;
    if (name === "lastName") data.lastName = value;
    if (name === "password") data.password = value;
    if (name === "age") data.age = parseInt(value);
    if (name === "mobileNumber") data.mobileNumber = value;
    data.statusFlag = 0;
  };

  const handleSubmit = () => {
    const dataValues = Object.values(data);
    if (dataValues.includes(null) || dataValues.includes("")) {
      alert("All fields are required");
    } else if (data.mobileNumber.length !== 10) {
      alert("Enter valid phone number.");
    } else {
      data.password = encrypt(data.password);
      fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          if (Object.keys(result).length > 0) {
          }
        })
        .catch(console.log);
    }
  };

  return (
    <>
      {dataLoading ? (
        <h1> loading...</h1>
      ) : (
        <div>
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
              type="text"
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
            <label htmlFor="mobileNumber">Phone Number: </label>
            <input
              type="tel"
              placeholder="mobileNumber"
              id="mobileNumber"
              name="mobileNumber"
              defaultValue={data.mobileNumber}
              onChange={handleOnChange}
            />
          </ul>
          <button id="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}
    </>
  );
};

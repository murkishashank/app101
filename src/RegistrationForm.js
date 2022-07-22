import { React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const RegistrationForm = () => {
  const { userId = "" } = { ...useParams() };
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    age: "",
    status: 0,
  });

  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    setDataLoading(true);
    fetch(`http://localhost:8080/api/users/${userId}`, { method: "GET" })
      .then((response) => response.json())
      .then((result) => {
        if (result !== null) {
          setData(result);
        }
        setDataLoading(false);
      });
  }, [userId]);

  const handleOnChange = () => {
    data.firstName = document.getElementById("firstName").value;
    data.lastName = document.getElementById("lastName").value;
    data.age = parseInt(document.getElementById("age").value);
    data.mobileNumber = document.getElementById("phoneNumber").value;
  }

  const handleSubmit = () => {
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
  };

  return (
    <>
      {dataLoading ? (
        <h1> loading...</h1>
      ) : (
        <form id="registrationForm">
          <ul>
            <label htmlFor="firstName">First Name: </label>
            <input
              placeholder="First name"
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
              id="lastName"
              name="lastName"
              defaultValue={data.lastName}
            />
          </ul>
          <ul>
            <label htmlFor="age">Age: </label>
            <input placeholder="Age" id="age" name="age" defaultValue={data.age} />
          </ul>
          <ul>
            <label htmlFor="phoneNumber">Phone Number: </label>
            <input
              placeholder="phoneNumber"
              id="phoneNumber"
              name="phoneNumber"
              defaultValue={data.mobileNumber}
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

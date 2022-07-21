import { React, useEffect, useState } from "react";

export const RegistrationForm = () => {
  const [data, setData] = useState({
});

  useEffect(() => {
    fetch("http://localhost:8080/api/allUser", {method: "GET"}).then(response => response.json).
    then(result => setData(result));
  }, []) 

  const handleSubmit = () => {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var age = document.getElementById("age").value;
    var phoneNumber = document.getElementById("phoneNumber").value;

  };

  return (
    <>
      <form id="registrationForm">
        <ul>
          <label for="firstName">First Name: </label>
          <input placeholder="First name" id="firstName" name="firstName" />
        </ul>
        <ul>
          <label for="lastName">Last Name: </label>
          <input placeholder="Last name" id="lastName" name="lastName" />
        </ul>
        <ul>
          <label for="age">Age: </label>
          <input placeholder="Age" id="age" name="age" />
        </ul>
        <ul>
          <label for="phoneNumber">Phone Number: </label>
          <input placeholder="phoneNumber" id="phoneNumber" name="phoneNumber" />
        </ul>
        <button id="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </>
  );
};

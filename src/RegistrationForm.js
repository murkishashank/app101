import { React, useEffect, useState } from "react";

export const RegistrationForm = () => {
  const data = {
    firstName: "",
    lastName: "",
    mobileNumber: "",
    age: ""
  };
  const [dataLoading, setDataLoading] = useState(true);

//   useEffect(() => {
//     setDataLoading(true);
//     fetch("http://localhost:8080/api/allUsers", {method: "GET"}).then(response => response.json).
//     then(result => {
//         setData(result);
//         setDataLoading(false)
//     });
//   }, []) 

  const handleSubmit = () => {

    data.firstName = document.getElementById("firstName").value;
    data.lastName = document.getElementById("lastName").value;
    data.age = document.getElementById("age").value;
    data.mobileNumber = document.getElementById("phoneNumber").value;
    
    fetch("http://localhost:8080/api/users", {method: "POST",
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)})
  };

 
  return (
    <>
    {/* {dataLoading ? <h1> loading...</h1> : ""} */}
      <form id="registrationForm">
        <ul>
          <label htmlFor="firstName" >First Name: </label>
          <input placeholder="First name" id="firstName" name="firstName" />
        </ul>
        <ul>
          <label htmlFor="lastName">Last Name: </label>
          <input placeholder="Last name" id="lastName" name="lastName" />
        </ul>
        <ul>
          <label htmlFor="age">Age: </label>
          <input placeholder="Age" id="age" name="age" />
        </ul>
        <ul>
          <label htmlFor="phoneNumber">Phone Number: </label>
          <input placeholder="phoneNumber" id="phoneNumber" name="phoneNumber" />
        </ul>
        <button id="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </>
  );
};

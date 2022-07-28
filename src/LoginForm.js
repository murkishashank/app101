import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { decrypt } from "./Encryption";
import { useFetch } from "./CustomHooks/useFetch";
export const LoginForm = (props) => {
  const navigate = useNavigate();
  // const [loginDetails, setLoginDetails] = useState({
  //   userName: "",
  //   password: "",
  // });

  function reducer(state, action) {
    switch (action.key) {
      case "userName":
        return { ...state, userName: action.value };
      case "password":
        return { ...state, password: action.value };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, { userName: "", password: "" });

  const [fetchUserData] = useFetch();

  function fetchUserName(userName) {
    fetchUserData(userName).then((data) => {
      validateLogin(data);
    });
  }

  function validateLogin(userDetails) {
    // const { userName, password } = loginDetails;
    const { userName, password } = state;
    const designation = userDetails.designation;
    if (Object.keys(userDetails).length) {
      if (
        userName === userDetails.userName &&
        password === decrypt(userDetails.password)
      ) {
        if (props.loginUserDetails) {
          props.loginUserDetails(userDetails);
        }
        if (designation === "Manager") {
          return navigate("/admin");
        }
        navigate("/home");
      } else {
        if (userDetails.message === "No value present") {
          alert("user does not exist. Please Register Now");
        } else {
          alert("invalid username password");
        }
      }
    }
  }

  // function handleOnChange(key, value) {
  //   const loginDetailsClone = { ...loginDetails, [key]: value };
  //   setLoginDetails(loginDetailsClone);
  // }

  return (
    <div
      style={{
        height: 350,
        width: 400,
        backgroundColor: "white",
        borderRadius: "25px",
        borderStyle: "groove",
        marginLeft: "500px",
        marginTop: "90px",
        padding: "20px",
      }}
    >
      <center>
        <h3>User Login Form</h3>
      </center>
      <div className="mb-3">
        <label>
          <h6>User Name: </h6>
        </label>
        <input
          className="form-control"
          placeholder="Enter User Name "
          id="userName"
          name="userName"
          onChange={(event) => {
            dispatch({ key: "userName", value: event.target.value });
            // handleOnChange("userName", event.target.value);
          }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="lastName">
          {" "}
          <h6>Password:</h6>{" "}
        </label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter Password"
          id="password"
          name="password"
          onChange={(event) => {
            dispatch({ key: "password", value: event.target.value });
            // handleOnChange("password", event.target.value);
          }}
        />
      </div>
      <div>
        <div style={{ marginTop: "10px" }} className="d-grid">
          <button
            className="btn btn-primary"
            onClick={() => {
              fetchUserName(state.userName);
              // fetchUserName(loginDetails.userName);
            }}
          >
            Login
          </button>
        </div>
        <div style={{ marginTop: "10px" }} className="d-grid">
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate("/registrationform/new");
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

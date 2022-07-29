import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { decrypt } from "../utils/Encryption";
// import { useFetch } from "../CustomHooks/useFetch";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getUser } from "../api/getUserByUserName";
export const LoginForm = (props) => {
  const navigate = useNavigate();

  const reducer = (state, action) => {
    switch (action.key) {
      case "userName":
        return { ...state, userName: action.value };
      case "password":
        return { ...state, password: action.value };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, { userName: "", password: "" });

  // const [fetchUserData] = useFetch();

  const fetchUserName = (userName) => {
    getUser(userName).then((data) => {
      validateLogin(data);
    });
  };

  const validateLogin = (userDetails) => {
    if (userDetails == null) {
      alert("user does not exist. Please Register Now ");
    }
    const { userName, password } = state;
    if (Object.keys(userDetails).length) {
      if (
        userName === userDetails.userName &&
        password === decrypt(userDetails.password)
      ) {
        if (props.loginUserDetails) {
          props.loginUserDetails(userDetails);
        }
        navigate("/home");
      } else {
        alert("invalid username password");
      }
    }
  };

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
        <Form.Label>
          <h3>User Login Form</h3>
        </Form.Label>
      </center>
      <Form.Group className="mb-3">
        <Form.Label>
          <h6>User Name: </h6>
        </Form.Label>
        <Form.Control
          type="text"
          className="form-control"
          placeholder="Enter User Name "
          id="userName"
          name="userName"
          onChange={(event) => {
            dispatch({ key: "userName", value: event.target.value });
            // handleOnChange("userName", event.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="lastName">
          <h6>Password:</h6>
        </Form.Label>
        <Form.Control
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
      </Form.Group>
      <Form.Group>
        <Form.Group style={{ marginTop: "10px" }} className="d-grid">
          <Button
            className="btn btn-primary"
            onClick={() => {
              fetchUserName(state.userName);
              // fetchUserName(loginDetails.userName);
            }}
          >
            Login
          </Button>
        </Form.Group>
        <Form.Group style={{ marginTop: "10px" }} className="d-grid">
          <Button
            className="btn btn-primary"
            onClick={() => {
              navigate("/registrationform/new");
            }}
          >
            Sign Up
          </Button>
        </Form.Group>
      </Form.Group>
    </div>
  );
};

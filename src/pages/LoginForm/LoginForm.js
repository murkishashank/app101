import { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { decrypt } from "../../utils/Encryption";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getUser } from "../../api/getUserByUserName";
import { useLoginFormSlice } from "./Slice/action";
import { useSelector, useDispatch } from "react-redux";
import { selectUserLoginDetails } from "./Slice/selector";
import Image from "react-bootstrap/Image";

export const LoginForm = (props) => {
  localStorage.clear();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { actions } = useLoginFormSlice();
  const userLoginDetails = useSelector(selectUserLoginDetails);
  const { userName, password } = userLoginDetails;

  // const initialState = { userName: "", password: "" };
  // const reducer = (state, action) => {
  //   switch (action.key) {
  //     case "userName":
  //       return { ...state, userName: action.value };
  //     case "password":
  //       return { ...state, password: action.value };
  //     default:
  //       return state;
  //   }
  // };

  // const [state, dispatch] = useReducer(reducer, initialState);
  // const [fetchUserData] = useFetch();

  const handleOnChange = (key, value) => {
    dispatch(actions.updateUserLoginDetails({ key: key, value: value }));
  };

  const fetchUserName = (userName) => {
    getUser(userName).then((data) => {
      validateLogin(data);
    });
  };

  const validateLogin = (userDetails) => {
    if (userDetails == null) {
      alert("user does not exist. Please Register Now ");
    }
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
    <div>
      <div
        style={{
          width: "46%",
          height: "50%",
          marginTop: 213,
        }}
      >
        <Form.Group>
          <center>
            <Form.Label>
              <Image src={"../Tecnics.png"} height="90px"></Image>
              <h3> New Here?</h3>
              <Form.Label>
                <h5> Sign up and discover new opportunities</h5>
              </Form.Label>
              <Form.Group
                style={{ marginTop: "10px", width: "60" }}
                className="d-grid"
              >
                <Button
                  className="btn btn-secondary"
                  onClick={() => {
                    navigate("/registrationform/new");
                  }}
                >
                  Sign Up
                </Button>
              </Form.Group>
            </Form.Label>
          </center>
        </Form.Group>
      </div>
      <div
        style={{
          width: "50%",
          height: "50",
          marginLeft: "auto",
        }}
      >
        <div
          style={{
            height: 400,
            width: 450,
            backgroundColor: "#F5F2F2",
            borderRadius: "25px",
            borderStyle: "groove",
            marginLeft: "15px",
            marginTop: "-300px",
            padding: "20px",
          }}
        >
          <center>
            <Form.Label>
              <Image src={"../Tecnics.png"} height="75"></Image>
              <h3>Login Form</h3>
            </Form.Label>
          </center>
          <Form.Group className="mb-3">
            <Form.Label>
              <h6>User Name: </h6>
            </Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              placeholder="User Name "
              id="userName"
              name="userName"
              onChange={(event) => {
                // dispatch({ key: "userName", value: event.target.value });
                handleOnChange("userName", event.target.value);
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
              placeholder=" Password"
              id="password"
              name="password"
              onChange={(event) => {
                // dispatch({ key: "password", value: event.target.value });
                handleOnChange("password", event.target.value);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Group style={{ marginTop: "10px" }} className="d-grid">
              <Button
                className="btn btn-secondary"
                onClick={() => {
                  fetchUserName(userName);
                  // fetchUserName(loginDetails.userName);
                }}
              >
                Login
              </Button>
            </Form.Group>
          </Form.Group>
        </div>
      </div>
    </div>
  );
};

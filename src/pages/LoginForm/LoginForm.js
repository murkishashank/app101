import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import Image from "react-bootstrap/Image";

import {
  Grid,
  Paper,
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Button,
} from "@mui/material";

import logo from "../../assets/images/tecnics.png";
import { getUser } from "../../api/getUserByUserName";
import { validateLoginDetails } from "../../api/validateLoginDetails";
import { useLoginFormSlice } from "./Slice/action";
import { selectUserLoginDetails } from "./Slice/selector";

export const LoginForm = (props) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { actions } = useLoginFormSlice();
  const userLoginDetails = useSelector(selectUserLoginDetails);
  const { userName, password } = userLoginDetails;
  const [errorMessage, setErrorMessage] = useState({
    userName: "",
    password: "",
    loginError: "",
  });

  const handleOnChange = (key, value) => {
    dispatch(actions.updateUserLoginDetails({ key: key, value: value }));
  };

  const handleLogin = (userLoginDetails) => {
    const isPayloadValid = validatePayload(userLoginDetails);
    if (isPayloadValid) {
      validateLoginDetails(userLoginDetails).then((data) => {
        getUserDetails(data);
      });
    }
  };

  const validatePayload = (payload) => {
    let isPayloadValid;
    const keys = Object.keys(payload);
    const errorMessageClone = { ...errorMessage };
    keys.forEach((key) => {
      if (
        payload[key] === "" ||
        payload[key] === null ||
        payload[key] === undefined
      ) {
        errorMessageClone[key] = `${key} is required`;
        setErrorMessage(errorMessageClone);
        isPayloadValid = false;
        return isPayloadValid;
      } else {
        errorMessageClone[key] = "";
        setErrorMessage(errorMessageClone);
        isPayloadValid = true;
        return isPayloadValid;
      }
    });
    return isPayloadValid;
  };

  const getUserDetails = (isUserValid) => {
    if (isUserValid) {
      getUser(userName).then((data) => {
        if (props.loginUserDetails) {
          dispatch(actions.setToInitialState());
          props.loginUserDetails(data);
        }
        navigate("/home");
      });
    } else {
      const errorMessageClone = { ...errorMessage };
      errorMessageClone["loginError"] = "Invalid username or password";
      setErrorMessage(errorMessageClone);
    }
  };

  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://tecnics.com/">
          Tecnics
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        alignItems: "center",
      }}
    >
      <Grid item xs={6}>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper
            elevation={0}
            sx={{
              my: 6,
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img alt="tecnics logo" src={logo} />
            <Typography component="h1" variant="h5">
              Discover new opportunities
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                navigate("/registrationform/new");
              }}
            >
              Sign Up
            </Button>
          </Paper>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box
          sx={{
            mx: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Paper elevation={3} sx={{ my: 6, p: 3 }}>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              // onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                error
                helperText={errorMessage.userName}
                onChange={(event) => {
                  // dispatch({ key: "userName", value: event.target.value });
                  handleOnChange("userName", event.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error
                helperText={errorMessage.password}
                onChange={(event) => {
                  // dispatch({ key: "password", value: event.target.value });
                  handleOnChange("password", event.target.value);
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => {
                  handleLogin(userLoginDetails);
                  // fetchUserName(loginDetails.userName);
                }}
              >
                Sign In
              </Button>
              <p className="errorMessage">{errorMessage.loginError}</p>

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Paper>
        </Box>
      </Grid>
    </Grid>
    // <div>
    //   <div
    //     style={{
    //       width: "46%",
    //       height: "50%",
    //       marginTop: 213,
    //     }}
    //   >
    //     <Form.Group>
    //       <center>
    //         <Form.Label>
    //           <Image src={"../Tecnics.png"} height="90px"></Image>
    //           <h3> New Here?</h3>
    //           <Form.Label>
    //             <h5> Sign up and discover new opportunities</h5>
    //           </Form.Label>
    //           <Form.Group
    //             style={{ marginTop: "10px", width: "60" }}
    //             className="d-grid"
    //           >
    //             <Button
    //               className="btn btn-secondary"
    //               onClick={() => {
    //                 navigate("/registrationform/new");
    //               }}
    //             >
    //               Sign Up
    //             </Button>
    //           </Form.Group>
    //         </Form.Label>
    //       </center>
    //     </Form.Group>
    //   </div>
    //   <div
    //     style={{
    //       width: "50%",
    //       height: "50",
    //       marginLeft: "auto",
    //     }}
    //   >
    //     <div
    //       style={{
    //         height: "auto",
    //         width: 450,
    //         backgroundColor: "#F5F2F2",
    //         borderRadius: "25px",
    //         borderStyle: "groove",
    //         marginLeft: "15px",
    //         marginTop: "-300px",
    //         padding: "20px",
    //       }}
    //     >
    //       <center>
    //         <Form.Label>
    //           <Image src={"../Tecnics.png"} height="75"></Image>
    //           <h3>Login Form</h3>
    //         </Form.Label>
    //       </center>
    //       <Form.Group className="mb-3">
    //         <Form.Label>
    //           <h6>User Name: </h6>
    //         </Form.Label>
    //         <Form.Control
    //           type="text"
    //           className="form-control"
    //           placeholder="User Name "
    //           id="userName"
    //           name="userName"
    // onChange={(event) => {
    //   // dispatch({ key: "userName", value: event.target.value });
    //   handleOnChange("userName", event.target.value);
    // }}
    //         />
    //       </Form.Group>
    //       <p className="errorMessage">{errorMessage.userName}</p>
    //       <Form.Group className="mb-3">
    //         <Form.Label htmlFor="lastName">
    //           <h6>Password:</h6>
    //         </Form.Label>
    //         <Form.Control
    //           type="password"
    //           className="form-control"
    //           placeholder=" Password"
    //           id="password"
    //           name="password"
    // onChange={(event) => {
    //   // dispatch({ key: "password", value: event.target.value });
    //   handleOnChange("password", event.target.value);
    // }}
    //         />
    //       </Form.Group>
    //       <p className="errorMessage">{errorMessage.password}</p>
    //       <Form.Group>
    //         <Form.Group style={{ marginTop: "10px" }} className="d-grid">
    //           <Button
    //             className="btn btn-secondary"
    // onClick={() => {
    //   handleLogin(userLoginDetails);
    //   // fetchUserName(loginDetails.userName);
    // }}
    //           >
    //             Login
    //           </Button>
    //         </Form.Group>
    // <p className="errorMessage">{errorMessage.loginError}</p>
    //       </Form.Group>
    //     </div>
    //   </div>
    // </div>
  );
};

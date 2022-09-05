import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import Image from "react-bootstrap/Image";

import { useSelector, useDispatch } from "react-redux";
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
import { useLoginFormSlice } from "./slice/action";
import { selectErrorsMessage, selectUserLoginDetails } from "./slice/selector";
import Image from "react-bootstrap/Image";

export const LoginForm = (props) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { actions } = useLoginFormSlice();
  const userLoginDetails = useSelector(selectUserLoginDetails);
  const errorMessage = useSelector(selectErrorsMessage);
  const { userName, password } = userLoginDetails;

  const handleOnChange = (key, value) => {
    if (errorMessage[key].error && value.length) {
      dispatch(
        actions.updateErrors({
          key: key,
          errorObject: { error: false, errorMessage: "" },
        })
      );
    }
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
    keys.forEach((key) => {
      if (
        payload[key] === "" ||
        payload[key] === null ||
        payload[key] === undefined
      ) {
        dispatch(
          actions.updateErrors({
            key: key,
            errorObject: { error: true, errorMessage: `${key} is required` },
          })
        );
        isPayloadValid = false;
      } else {
        isPayloadValid = true;
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
      dispatch(
        actions.updateErrors({
          key: "invalidUser",
          errorObject: {
            error: false,
            errorMessage: "",
          },
        })
      );
    } else {
      dispatch(
        actions.updateErrors({
          key: "invalidUser",
          errorObject: {
            error: true,
            errorMessage: "Invalid username or password",
          },
        })
      );
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
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              // component="form"
              noValidate
              // onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                autoComplete="username"
                autoFocus
                error={errorMessage.userName.error}
                helperText={errorMessage.userName.errorMessage}
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
                error={errorMessage.password.error}
                helperText={errorMessage.password.errorMessage}
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
              <p className="errorMessage">
                {errorMessage.invalidUser.error &&
                  errorMessage.invalidUser.errorMessage}
              </p>

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
  );
};

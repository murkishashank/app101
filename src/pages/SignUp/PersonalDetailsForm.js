import { Grid, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { signUpSlice } from "./slice/actions";
import {
  selectErrorsMessage,
  selectPersonalDetails,
  selectDataLoading,
} from "./slice/selectors";

export const PersonalDetailsForm = () => {
  const dispatch = useDispatch();
  const { actions } = signUpSlice;
  const personalDetails = useSelector(selectPersonalDetails);
  const errorMessage = useSelector(selectErrorsMessage);
  const dataLoaded = useSelector(selectDataLoading);
  const { firstName, lastName, userName, password, dateOfBirth } =
    personalDetails;
  const handleOnChange = (key, value) => {
    dispatch(actions.updatePersonalDetails({ key: key, value: value }));
  };
  console.log("dataLoaded", dataLoaded);
  return (
    <>
      {/* {dataLoaded ? ( */}
        <Grid container spacing={3} padding={"20px"}>
          <Grid item xs={12} sm={6}>
            <TextField
              type={"text"}
              name={"firstName"}
              InputLabelProps={{ required: true }}
              label={"First Name"}
              fullWidth
              defaultValue={firstName}
              error={errorMessage.firstName.error}
              helperText={errorMessage.firstName.errorMessage}
              onChange={(e) => {
                handleOnChange(e.target.name, e.target.value);
              }}
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type={"text"}
              name={"lastName"}
              InputLabelProps={{ required: true }}
              label={"Last Name"}
              fullWidth
              defaultValue={lastName}
              error={errorMessage.lastName.error}
              helperText={errorMessage.lastName.errorMessage}
              onChange={(e) => {
                handleOnChange(e.target.name, e.target.value);
              }}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              type={"text"}
              InputLabelProps={{ required: true }}
              name={"userName"}
              label={"User Name"}
              fullWidth
              defaultValue={userName}
              error={errorMessage.userName.error}
              helperText={errorMessage.userName.errorMessage}
              onChange={(e) => {
                handleOnChange(e.target.name, e.target.value);
              }}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              InputLabelProps={{ required: true }}
              type={"password"}
              name={"password"}
              label={"Password"}
              fullWidth
              defaultValue={password}
              error={errorMessage.password.error}
              helperText={errorMessage.password.errorMessage}
              onChange={(e) => {
                handleOnChange(e.target.name, e.target.value);
              }}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              type={"date"}
              name={"dateOfBirth"}
              label={"Date of Birth"}
              InputLabelProps={{ shrink: true, required: true }}
              fullWidth
              defaultValue={dateOfBirth}
              error={errorMessage.dateOfBirth.error}
              helperText={errorMessage.dateOfBirth.errorMessage}
              onChange={(e) => {
                handleOnChange(e.target.name, e.target.value);
              }}
            ></TextField>
          </Grid>
        </Grid>
      {/* ) : (
        <h2>Loading...</h2>
      )} */}
    </>
  );
};

import { Grid, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { signUpSlice } from "./slice/actions";
import { selectCommunicationDetails } from "./slice/selectors";

export const AddressDetailsForm = () => {
  const dispatch = useDispatch();
  const { actions } = signUpSlice;
  const communicationDetails = useSelector(selectCommunicationDetails);
  const {
    contactAddress,
    permanentAddress,
    mobileNumber,
    alternativeMobileNumber,
    personalEmailId,
  } = communicationDetails;

  console.log("communicationDetails", communicationDetails)

  const handleOnChange = (key, value) => {
    dispatch(actions.updateCommunicationDetails({ key: key, value: value }));
  };
  return (
    <>
      <Grid container spacing={3} padding={"20px"}>
        <Grid item xs={12}>
          <TextField
            type={"text"}
            name={"contactAddress"}
            label={"Contact Address"}
            fullWidth
            defaultValue={contactAddress}
            onChange={(e) => {
              handleOnChange(e.target.name, e.target.value);
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            type={"text"}
            name={"permanentAddress"}
            label={"Permanent Address"}
            fullWidth
            defaultValue={permanentAddress}
            onChange={(e) => {
              handleOnChange(e.target.name, e.target.value);
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            type={"tel"}
            name={"mobileNumber"}
            label={"Mobile Number"}
            fullWidth
            defaultValue={mobileNumber}
            onChange={(e) => {
              handleOnChange(e.target.name, e.target.value);
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            type={"tel"}
            name={"alternativeMobileNumber"}
            label={"Alternate Mobile Number"}
            fullWidth
            defaultValue={alternativeMobileNumber}
            onChange={(e) => {
              handleOnChange(e.target.name, e.target.value);
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            type={"email"}
            name={"personalEmailId"}
            label={"Personal Email"}
            fullWidth
            defaultValue={personalEmailId}
            onChange={(e) => {
              handleOnChange(e.target.name, e.target.value);
            }}
          ></TextField>
        </Grid>
      </Grid>
    </>
  );
};

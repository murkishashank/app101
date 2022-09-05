import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Stepper, Step, StepLabel, Box, Button } from "@mui/material";
import { PersonalDetailsForm } from "./PersonalDetailsForm";
import { AddressDetailsForm } from "./AddressDetailsForm";
import { VerificationDocs } from "./VerificationDocs";
import { useDispatch, useSelector } from "react-redux";
import { signUpSlice } from "./slice/actions";
import {
  selectCommunicationDetails,
  selectPersonalDetails,
  selectVerifactionDocs,
} from "./slice/selectors";
import { encrypt } from "../../utils/Encryption";
import { postUser } from "../../api/postUser";
import { getUserById } from "../../api/getUserById";
import { useEffect } from "react";

export const SignUp = () => {
  const { userId = 0 } = { ...useParams() };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { actions } = signUpSlice;
  const personalDetails = useSelector(selectPersonalDetails);
  const communicationDetails = useSelector(selectCommunicationDetails);
  const verificationDocs = useSelector(selectVerifactionDocs);

  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    "Personal Details",
    "Communication Details",
    "Upload Documents",
    "Review",
  ];

  const _renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <PersonalDetailsForm />;
      case 1:
        return <AddressDetailsForm />;
      case 2:
        return <VerificationDocs />;
      default:
        return <div>Not Found</div>;
    }
  };

  useEffect(() => {
    getUserById(userId).then((result) => {
      dispatch(actions.updateDetails(result));
      dispatch(actions.updateDataLoading());
    });
  }, [dispatch]);

  const validateForm = (details) => {
    console.log("Values", details);
    let isPayloadValid;
    const keys = Object.keys(details);
    keys.forEach((key) => {
      if (
        details[key] === "" ||
        details[key] === null ||
        details[key] === undefined
      ) {
        dispatch(
          actions.updateErrors({
            key: key,
            errorObject: { error: true, errorMessage: `${key} is required` },
          })
        );
        isPayloadValid = false;
      } else {
        dispatch(
          actions.updateErrors({
            key: key,
            errorObject: { error: false, errorMessage: "" },
          })
        );
        isPayloadValid = true;
      }
    });
    return isPayloadValid;
  };

  const handleNext = () => {
    let isValid = true;
    if (activeStep === 0) {
      isValid = validateForm(personalDetails);
    } else if (activeStep === 1) {
      isValid = validateForm(communicationDetails);
    } else if (activeStep === 2) {
      isValid = validateForm(verificationDocs);
    }

    if (isValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = () => {
    const payload = {
      ...personalDetails,
      ...communicationDetails,
      ...verificationDocs,
    };
    console.log("UserDetails", payload);
    payload["password"] = encrypt(personalDetails.password);
    postUser(payload).then((result) => {
      result.userName === personalDetails.userName
        ? navigate("/")
        : alert("Error while saving the data.");
    });
    handleNext();
  };

  return (
    <>
      <Box sx={{ width: "100%", padding: "50px" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <>
          {activeStep === steps.length ? (
            <h3>Thank you</h3>
          ) : (
            <>
              {_renderStepContent(activeStep)}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  pt: 2,
                }}
              >
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                {activeStep === steps.length - 1 ? (
                  <Button onClick={handleSubmit}>Submit</Button>
                ) : (
                  <Button onClick={handleNext}>Next</Button>
                )}
              </Box>
            </>
          )}
        </>
      </Box>
    </>
  );
};

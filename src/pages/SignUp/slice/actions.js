import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  personalDetails: {
    id: "",
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    dateOfBirth: "",
  },
  communicationDetails: {
    contactAddress: "",
    permanentAddress: "",
    mobileNumber: "",
    alternativeMobileNumber: "",
    personalEmailId: "",
  },
  verificationDocs: {
    addressProof: "",
  },
  dataLoaded: false,
  errors: {
    firstName: { error: false, errorMessage: "" },
    lastName: { error: false, errorMessage: "" },
    userName: { error: false, errorMessage: "" },
    password: { error: false, errorMessage: "" },
    dateOfBirth: { error: false, errorMessage: "" },
    contactAddress: { error: false, errorMessage: "" },
    permanentAddress: { error: false, errorMessage: "" },
    mobileNumber: { error: false, errorMessage: "" },
    alternativeMobileNumber: { error: false, errorMessage: "" },
    personalEmailId: { error: false, errorMessage: "" },
    addressProof: { error: false, errorMessage: "" },
  },
};

export const signUpSlice = createSlice({
  name: "signup",
  initialState: initialState,
  reducers: {
    updateDetails(state, action) {
      const result = action.payload;
      const {
        id,
        firstName,
        lastName,
        userName,
        password,
        dateOfBirth,
        contactAddress,
        permanentAddress,
        mobileNumber,
        alternativeMobileNumber,
        personalEmailId,
        addressProof,
      } = result;
      state.personalDetails = {
        id,
        firstName,
        lastName,
        userName,
        password,
        dateOfBirth,
      };
      state.communicationDetails = {
        contactAddress,
        permanentAddress,
        mobileNumber,
        alternativeMobileNumber,
        personalEmailId,
      };
      state.verificationDocs = { addressProof };
      // state[key] = value;
    },
    updatePersonalDetails(state, action) {
      const { key, value } = action.payload;
      state.personalDetails[key] = value;
    },
    updateCommunicationDetails(state, action) {
      const { key, value } = action.payload;
      state.communicationDetails[key] = value;
    },
    updateVerificationDocs(state, action) {
      const { key, value } = action.payload;
      state.verificationDocs[key] = value;
    },
    updateErrors(state, action) {
      const { key, errorObject } = action.payload;
      state.errors[key] = errorObject;
    },
    updateDataLoading(state) {
      state.dataLoaded = true;
    }
  },
});

export const useSignUpSlice = () => {
  return { actions: signUpSlice.actions };
};

export default signUpSlice.reducer;

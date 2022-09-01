import { createSlice } from "@reduxjs/toolkit";
import { encrypt } from "../../../utils/Encryption";
// import { workStatusUserSaga } from "./saga";

export const initialState = {
  userLoginDetails: { userName: "", password: "" },
  errors: {
    userName: { error: false, errorMessage: "" },
    password: { error: false, errorMessage: "" },
    invalidUser: { error: false, errorMessage: "" },
  },
};

export const loginFormSlice = createSlice({
  name: "LoginFrom",
  initialState: initialState,
  reducers: {
    updateUserLoginDetails(state, action) {
      const { key, value } = action.payload;
      if (key === "password") {
        state.userLoginDetails[key] = encrypt(value);
      } else {
        state.userLoginDetails[key] = value;
      }
    },
    setToInitialState(state) {
      state.userLoginDetails = initialState.userLoginDetails;
    },
    updateErrors(state, action) {
      const { key, errorObject } = action.payload;
      state.errors[key] = errorObject;
    },
  },
});

export const { actions: LoginFormActions } = loginFormSlice.actions;

export const useLoginFormSlice = () => {
  return { actions: loginFormSlice.actions };
};
export default loginFormSlice.reducer;

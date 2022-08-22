import { createSlice } from "@reduxjs/toolkit";
import { encrypt } from "../../../utils/Encryption";
// import { workStatusUserSaga } from "./saga";

export const initialState = {
  userLoginDetails: { userName: "", password: "" },
};

export const loginFormSlice = createSlice({
  name: "LoginFrom",
  initialState: initialState,
  reducers: {
    updateUserLoginDetails(state, action) {
      const { key, value } = action.payload;
      if(key === "password") {
        state.userLoginDetails[key] = encrypt(value);
      } else {
        state.userLoginDetails[key] = value;
      }
    },
    setToInitialState(state) {
      state.userLoginDetails = initialState.userLoginDetails;
    }
  },
});

export const { actions: LoginFormActions } = loginFormSlice.actions;

export const useLoginFormSlice = () => {
  return { actions: loginFormSlice.actions };
};
export default loginFormSlice.reducer;

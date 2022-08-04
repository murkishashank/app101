import { createSlice } from "@reduxjs/toolkit";
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
      state.userLoginDetails[key] = value;
    },
  },
});

export const { actions: LoginFormActions } = loginFormSlice.actions;

export const useLoginFormSlice = () => {
  return { actions: loginFormSlice.actions };
};
export default loginFormSlice.reducer;

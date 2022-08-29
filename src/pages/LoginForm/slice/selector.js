import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "./action";

const selectSlice = (state) => state.loginForm || initialState;

export const selectUserLoginDetails = createSelector(
  [selectSlice],
  (state) => state.userLoginDetails
);

export const selectErrorsMessage = createSelector(
  [selectSlice],
  (state) => state.errors
);

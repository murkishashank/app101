import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "../Slice/action";

const selectSlice = (state) => state.fromLogin || initialState;

export const selectUserLoginDetails = createSelector(
  [selectSlice],
  (state) => state.userLoginDetails
);

import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "./action";

const selectSlice = (state) => state.manageEmp || initialState;

export const selectEmpRecords = createSelector(
  [selectSlice],
  (state) => state.empDetailsRecords
);

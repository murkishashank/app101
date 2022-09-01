import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "./action";

const selectSlice = (state) => state.manageNewEmp || initialState;

export const selectNewEmpRecords = createSelector(
  [selectSlice],
  (state) => state.allNewEmpRecords
);

export const selectManagers = createSelector(
  [selectSlice],
  (state) => state.managers
);

export const selectFinancialDetails = createSelector(
  [selectSlice],
  (state) => state.allFinancialDetails
);



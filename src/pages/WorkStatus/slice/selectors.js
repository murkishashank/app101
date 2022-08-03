import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "./actions";

const selectSlice = (state) => state.workStatusUser || initialState;

export const selectUserRecords = createSelector(
  [selectSlice],
  (state) => state.workStatusRecords
);

export const selectSavingStatus = createSelector(
  [selectSlice],
  (state) => state.savingStatus
);

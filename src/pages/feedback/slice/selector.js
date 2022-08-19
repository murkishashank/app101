import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "./actions";

const selectSlice = (state) => state.empFeedback || initialState;

export const selectFeedbackRecords = createSelector(
  [selectSlice],
  (state) => state.feedbackRecords
);

export const selectEmpFeedback = createSelector(
  [selectSlice],
  (state) => state.employeeCommentRecord
);

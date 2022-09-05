import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  employeeCommentRecord: { userId: "", comment: "", commentedDate: "" },
  feedbackRecords: [],
};

export const feedbackSlice = createSlice({
  name: "empFeedback",
  initialState: initialState,
  reducers: {
    loadFeedbackRecords(state, action) {
      state.feedbackRecords = action.payload;
    },

    updateEmployeeCommentRecord(state, action) {
      state.employeeCommentRecord = action.payload;
    },
    setEmployeeRecordToInitialState(state) {
      state.employeeCommentRecord = initialState.employeeCommentRecord;
    },
  },
});

export const useFeedbackSlice = () => {
  return { actions: feedbackSlice.actions };
};

export default feedbackSlice.reducer;

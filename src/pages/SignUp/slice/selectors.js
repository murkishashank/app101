import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "./actions";

const selectSlice = (state) => state.signUp || initialState;

export const selectPersonalDetails = createSelector(
  [selectSlice],
  (state) => state.personalDetails
);

export const selectCommunicationDetails = createSelector(
  [selectSlice],
  (state) => state.communicationDetails
);

export const selectVerifactionDocs = createSelector(
  [selectSlice],
  (state) => state.verificationDocs
);

export const selectErrorsMessage = createSelector(
  [selectSlice],
  (state) => state.errors
);

export const selectDataLoading = createSelector(
  [selectSlice],
  state => state.dataLoaded,
);
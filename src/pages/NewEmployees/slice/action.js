import { createSlice } from "@reduxjs/toolkit";
export const initialState = {
  allNewEmpRecords: [],
  managers: [],
  allFinancialDetails: [],
  loadingStatus: false,
};

export const findIndex = (id, records) => {
  return records
    .map((row) => row.id)
    .filter(Boolean)
    .findIndex((userId) => userId === id);
};

export const manageNewEmpSlice = createSlice({
  name: "manageNewEmp",
  initialState: initialState,
  reducers: {
    loadEmpDetails(state, action) {
    const {employees, managers} = action.payload;
      state.allNewEmpRecords = employees;
      state.managers = managers;
    },

    loadAllFinancialDetails(state, action){
      const { financialDetails } = action.payload;
      state.allFinancialDetails = financialDetails;
    },

    updateNewEmployeeDetails(state, action) {
      const { id, fieldKey, value } = action.payload;
      const index = findIndex(id, state.allNewEmpRecords);
      state.allNewEmpRecords[index][fieldKey] = value;
    },

    updateFinancialDetails(state, action) {
      const {id, field, value} = action.payload;
      const index = state.allFinancialDetails.findIndex((financialDetail) => financialDetail.userId === id);
      state.allFinancialDetails[index][field] = value;
    },
  },
});

export const useManageNewEmpSlice = () => {
  return { actions: manageNewEmpSlice.actions };
};

export default manageNewEmpSlice.reducer;
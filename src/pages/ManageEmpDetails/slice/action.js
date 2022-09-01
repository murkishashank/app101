import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  empDetailsRecords: [],
  loadingStatus: false,
  newEmployeeCount: 0,
};

const findIndex = (id, records) => {
  return records
    .map((row) => row.id)
    .filter(Boolean)
    .findIndex((userId) => userId === id);
};

export const manageEmpSlice = createSlice({
  name: "manageEmp",
  initialState: initialState,
  reducers: {
    loadAllEmployeeRecords(state, action) {
      state.empDetailsRecords = action.payload;
    },

    updateNewEmployeeCount(state, action) {
      state.newEmployeeCount = action.payload;
    },

    updateEmployeeDetails(state, action) {
      const { id, fieldKey, value } = action.payload;
      const index = findIndex(id, state.empDetailsRecords);
      state.empDetailsRecords[index][fieldKey] = value;
    },
  },
});

export const useManageEmpSlice = () => {
  return { actions: manageEmpSlice.actions };
};

export default manageEmpSlice.reducer;

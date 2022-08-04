import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  empDetailsRecords: [],
  loadingStatus: false,
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
      console.log("records", action.payload);
      state.empDetailsRecords = action.payload;
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

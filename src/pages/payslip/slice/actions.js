import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  employeeRecord: {},
  financialDetails: {},
  employeeLeavesRecords: [],
  month: "--Select month--",
};

export const paySlipSlice = createSlice({
  name: "payslip",
  initialState: initialState,
  reducers: {
    loadEmployeeDetails(state, action) {
      state.employeeRecord = action.payload;
    },
    loadFinancialDetails(state, action) {
      state.financialDetails = action.payload;
    },

    loadEmployeeLeavesRecords(state, action) {
      state.employeeLeavesRecords = action.payload;
    },

    updateMonth(state, action) {
      state.month = action.payload;
    },
  },
});

export const usePayslipSliceSaga = () => {
  return { actions: paySlipSlice.actions };
};

export default paySlipSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
const groupState = {
  basic: 0,
  conveyance: 0,
  houseRentAllowance: 0,
  medicalAllowance: 0,
  profPursuitsAllow: 0,
  arears: 0,
  otherAllowances: 0,
  professionTax: 0,
  providentFund: 0,
};

export const initialState = {
  employeeRecord: {},
  financialDetails: [],
  employeeLeavesRecords: [],
  month: "--Select month--",
  selectedMonthPayslip: {},
  recentPayslipRecords: [],
  managerPayRecords: [],
  humanResourcePayRecords: [],
  internPayRecords: [],
  tabValue: "Manager",
  salaryUpdateState: {
    manager: groupState,
    hr: groupState,
    intern: groupState,
  },
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

    updateSelectedMonthPayslip(state, action) {
      state.selectedMonthPayslip = action.payload;
    },

    loadRecentPayslipRecords(state, action) {
      state.recentPayslipRecords = action.payload;
    },

    updatePayRecords(state, action) {
      const { manager, hr, intern } = action.payload;
      state.humanResourcePayRecords = hr;
      state.managerPayRecords = manager;
      state.internPayRecords = intern;
    },

    updateTabValue(state, action) {
      state.tabValue = action.payload;
    },
    updateSalaryState(state, action) {
      const { group, key, value } = action.payload;
      state.salaryUpdateState[group][key] = value;
    },

    updateIncrementsToPayRecords(state, action) {
      const { payRecordName, records } = action.payload;
      state[payRecordName] = records;
    },
  },
});

export const usePayslipSliceSaga = () => {
  return { actions: paySlipSlice.actions };
};

export default paySlipSlice.reducer;

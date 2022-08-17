import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "./actions";

const selectSlice = (state) => state.payslip || initialState;

export const selectEmployeeDetails = createSelector(
  [selectSlice],
  (state) => state.employeeRecord
);

export const selectFinancialDetails = createSelector(
  [selectSlice],
  (state) => state.financialDetails
);
export const selectEmployeeLeavesDetails = createSelector(
  [selectSlice],
  (state) => state.employeeLeavesRecords
);
export const selectedMonth = createSelector(
  [selectSlice],
  (state) => state.month
);

export const selectCurrentSelectedPayslip = createSelector(
  [selectSlice],
  (state) => state.selectedMonthPayslip
);

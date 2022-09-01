import { createSlice } from "@reduxjs/toolkit";
import { monthsNumber } from "../../../utils/months";
export const initialState = {
  allNewEmpRecords: [],
  managers: [],
  allFinancialDetails: [],
  loadingStatus: false,
};

const getSalCreditedMonth = (type) => {
  const toDayDate = new Date();
  const month = toDayDate.getMonth();
  return `${monthsNumber[month]}-${toDayDate.getFullYear()}`;
};

const financialRecordState = {
  userId: null,
  accountNumber: "",
  pfAccountNumber: "",
  bankIFSC: "",
  bankBranchName: "",
  panNumber: "",
  basic: null,
  houseRentAllowance: null,
  conveyance: null,
  medicalAllowance: null,
  profPursuitsAllow: null,
  arears: 0,
  otherAllowances: null,
  professionTax: 500,
  providentFund: null,
  salCreditedMonth: getSalCreditedMonth(),
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
      const { employees, managers } = action.payload;
      state.allNewEmpRecords = employees;
      state.managers = managers;
    },

    updateNewEmployeeDetails(state, action) {
      const { id, fieldKey, value } = action.payload;
      const index = findIndex(id, state.allNewEmpRecords);
      if (
        fieldKey === "designation" &&
        (state.allNewEmpRecords[index].designation === "" ||
          state.allNewEmpRecords[index].designation === null)
      ) {
        const newRecord = { ...financialRecordState, userId: id };

        state.allFinancialDetails.push(newRecord);
      }
      state.allNewEmpRecords[index][fieldKey] = value;
    },

    updateFinancialDetails(state, action) {
      const { id, field, value } = action.payload;
      const index = state.allFinancialDetails.findIndex(
        (financialDetail) => financialDetail.userId === id
      );
      state.allFinancialDetails[index][field] = value;
    },
  },
});

export const useManageNewEmpSlice = () => {
  return { actions: manageNewEmpSlice.actions };
};

export default manageNewEmpSlice.reducer;

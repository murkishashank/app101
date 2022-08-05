import { createSlice } from "@reduxjs/toolkit";
import { getDateFormat } from "../../../utils/getDateFormat";
// import { workStatusUserSaga } from "./saga";

export const initialState = {
  workStatusRecords: [],
  savingStatus: false,
};

const findIndex = (id, records) => {
  return records
    .map((row) => row.id)
    .filter(Boolean)
    .findIndex((userId) => userId === id);
};
export const workStatusSlice = createSlice({
  name: "workStatusUser",
  initialState: initialState,
  reducers: {
    loadWorkStatusRecords(state, action) {
      state.workStatusRecords = action.payload;
    },
    updateUserRecord(state, action) {
      const { id, key, value } = action.payload;
      const index = findIndex(id, state.workStatusRecords);
      state.workStatusRecords[index][key] = value;
      state.workStatusRecords[index]["editStatus"] = true;
      if (key === "taskStatus") {
        state.workStatusRecords[index]["completedTimeStamp"] =
          value === "Completed" ? getDateFormat(new Date()) : "On progress";
      }
    },
    updateSavingStatus(state, action) {
      state.savingStatus = action.payload;
    },

    getWorkStatusRecords(state, action) {},
  },
});

export const { actions: workStatusActions } = workStatusSlice.actions;

export const useWorkStatusSlice = () => {
  //   useInjectSaga({ key: workStatusSlice.name, saga: workStatusUserSaga });
  return { actions: workStatusSlice.actions };
};
export default workStatusSlice.reducer;

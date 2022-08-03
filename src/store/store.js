import { configureStore } from "@reduxjs/toolkit";
import workStatusUserReducer from "../pages/WorkStatus/slice/actions";
export const store = configureStore({
  reducer: {
    workStatusUser: workStatusUserReducer,
  },
});

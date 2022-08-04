import { configureStore } from "@reduxjs/toolkit";
import workStatusUserReducer from "../pages/WorkStatus/slice/actions";
import loginFormReducer from "../pages/LoginForm/Slice/action";
export const store = configureStore({
  reducer: {
    workStatusUser: workStatusUserReducer,
    fromLogin: loginFormReducer,
  },
});

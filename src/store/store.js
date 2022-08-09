import { configureStore } from "@reduxjs/toolkit";
import workStatusUserReducer from "../pages/WorkStatus/slice/actions";
import loginFormReducer from "../pages/LoginForm/slice/action";
import manageEmpReducer from "../pages/ManageEmpDetails/slice/action";

export const store = configureStore({
  reducer: {
    workStatusUser: workStatusUserReducer,
    loginForm: loginFormReducer,
    manageEmp: manageEmpReducer,
  },
});

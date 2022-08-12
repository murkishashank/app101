import { configureStore } from "@reduxjs/toolkit";
import workStatusUserReducer from "../pages/WorkStatus/slice/actions";
import loginFormReducer from "../pages/LoginForm/Slice/action";
import manageEmpReducer from "../pages/ManageEmpDetails/slice/action";
import feedbackReducer from "../pages/feedback/slice/actions";
import payslipReducer from "../pages/payslip/slice/actions";
export const store = configureStore({
  reducer: {
    workStatusUser: workStatusUserReducer,
    loginForm: loginFormReducer,
    manageEmp: manageEmpReducer,
    empFeedback: feedbackReducer,
    payslip: payslipReducer,
  },
});

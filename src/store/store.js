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

// import { configureStore } from "@reduxjs/toolkit";
// import workStatusUserReducer from "../pages/WorkStatus/slice/actions";
// import loginFormReducer from "../pages/LoginForm/slice/action";
// import manageEmpReducer from "../pages/ManageEmpDetails/slice/action";
// import createSagaMiddleware from "redux-saga";
// import { createInjectorsEnhancer } from "redux-injectors";
// // import { createReducer } from "./reducers";
// import { combineReducers } from "@reduxjs/toolkit";

// const reduxSagaMonitorOptions = {};
// const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
// // const { run: runSaga } = sagaMiddleware;

// const sagaMiddleWares = [sagaMiddleware];

// const runSaga = sagaMiddleWares.run;
// const enhancers = [
//   createInjectorsEnhancer({
//     createReducer,
//     runSaga,
//   }),
// ];

// export function createReducer(injectedReducers = {}) {
//   // Initially we don't have any injectedReducers, so returning identity function to avoid the error
//   // if (Object.keys(injectedReducers).length === 0) {
//   //   return (state) => state;
//   // }
//   return combineReducers({
//     ...injectedReducers,
//   });
// }
// export const store = configureStore({
//   reducer: createReducer(),
//   // middleware: [sagaMiddleWares],
//   // devTools: createInjectorsEnhancer({
//   //   createReducer,
//   //   runSaga,
//   // }),
//   // reducer: {
//   //   workStatusUser: workStatusUserReducer,
//   //   loginForm: loginFormReducer,
//   //   manageEmp: manageEmpReducer,
//   // },
// });

// // reducer: createReducer(),
// // middleware: [sagaMiddleWares],
// // devTools: createInjectorsEnhancer({
// //   createReducer,
// //   runSaga,
// // }),

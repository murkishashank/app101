// import { call, put, takeLatest } from "redux-saga/effects";
// import { workStatusActions as actions } from "./actions";
import { request } from "../../../utils/requests";

export const loadWorkStatusRecordsSaga = (userId) => {
  const url = `http://localhost:8080/api/task/${userId}`;
  return request(url, {
    method: "GET",
  });
};

// export function* workStatusUserSaga() {
//   yield takeLatest(
//     actions.getWorkStatusRecords.type,
//     loadWorkStatusRecordsSaga
//   );
// }

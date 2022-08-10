import { convertDateToDbFormat } from "../../utils/InternalDateToDBFormat";
import { requiredEmpColDefs } from "./coldefs";

export const getPayload = (empRecord) => {
  const { dateOfBirth, ...rest } = empRecord;
  const emptyFields = requiredEmpColDefs.filter((field) => {
    if (empRecord[field] === "" || empRecord[field] === null) {
      return field;
    }
  });

  return {
    emptyFields: emptyFields,
    payload: { ...rest, dateOfBirth: convertDateToDbFormat(dateOfBirth) },
  };
};

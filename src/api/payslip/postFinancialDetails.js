import { request } from "../../utils/requests.ts";

export const saveFinancialRecord = (empFinancialRecord) => {
  return request(`/api/saveFinancialDetails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(empFinancialRecord),
  });
};

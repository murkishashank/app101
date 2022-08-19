import { request } from "../../utils/requests.ts";

export const saveFinancialRecords = (empFinancialRecords) => {
  return request(`/api/allEmpFinancialDetails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(empFinancialRecords),
  });
};

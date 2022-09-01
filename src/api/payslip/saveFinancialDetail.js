import { request } from "../../utils/requests.ts";

export const saveFinancialDetail = (financialDetail) => {
  return request(`/api/saveFinancialDetail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(financialDetail),
  });
};

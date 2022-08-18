import { request } from "../../utils/requests.ts";

export const getFinancialDetails = (userId) => {
  return request(`/api/financialDetails/${userId}`, {
    method: "GET",
  });
};

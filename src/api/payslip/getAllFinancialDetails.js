import { request } from "../../utils/requests.ts";

export const getAllFinancialDetails = () => {
  return request(`/api/allFinancialDetails`, {
    method: "GET",
  });
};

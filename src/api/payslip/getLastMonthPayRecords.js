import { request } from "../../utils/requests.ts";

export const getLastMonthPayRecords = (monthYear) => {
  return request(`/api/financialDetails/recentPayRecords/${monthYear}`, {
    method: "GET",
  });
};

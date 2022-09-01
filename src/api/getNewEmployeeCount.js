import { request } from "../utils/requests.ts";

export const getNewEmployeeCount = () => {
  return request(`/api/users/getNewEmployeeCount`, {
    method: "GET",
  });
};

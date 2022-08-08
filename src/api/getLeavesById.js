import { request } from "../utils/requests.ts";

export const getLeavesById = (userId) => {
  return request(`/api/userLeave/${userId}`, {
    method: "GET",
  });
};

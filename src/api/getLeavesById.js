import { request } from "../utils/requests.ts";

export const getLeavedById = (userId) => {
  return request(`/api/userLeave/${userId}`, {
    method: "GET",
  });
};

import { request } from "../utils/requests.ts";

export const getLeavedById = (userId) => {
  return request(`http://localhost:8080/api/userLeave/${userId}`, {
    method: "GET",
  });
};

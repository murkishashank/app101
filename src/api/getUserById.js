import { request } from "../utils/requests.ts";

export const getUserById = (userId) => {
  return request(`/api/users/${userId}`, {
    method: "GET",
  });
};

import { request } from "../utils/requests.ts";

export const getUserById = (userId) => {
  return request(`http://localhost:8080/api/users/${userId}`, {
    method: "GET",
  });
};

import { request } from "../utils/requests.ts";

export const getAllUsers = () => {
  return request(`http://localhost:8080/api/allUsers`, {
    method: "GET",
  });
};
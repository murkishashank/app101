import { request } from "../utils/requests.ts";

export const getAllUsers = () => {
  return request(`/api/allUsers`, {
    method: "GET",
  });
};

import { request } from "../utils/requests.ts";

export const getAllUserIds = (userId) => {
  return request(`http://localhost:8080/api/allUsersIds`, {
    method: "GET",
  });
};

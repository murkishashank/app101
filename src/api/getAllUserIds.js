import { request } from "../utils/requests.ts";

export const getAllUserIds = (userId) => {
  return request(`/api/allUsersIds`, {
    method: "GET",
  });
};

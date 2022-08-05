import { request } from "../utils/requests.ts";

export const getUser = (userName) => {
  return request(`/api/usersByUserName/${userName}`, {
    method: "GET",
  });
};

export const getWorkStatusByUserId = (userId) => {
  return request(`/api/task/${userId}`, {
    method: "GET",
  });
};

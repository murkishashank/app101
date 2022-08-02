import { request } from "../utils/requests.ts";

export const getUser = (userName) => {
  return request(`http://localhost:8080/api/usersByUserName/${userName}`, {
    method: "GET",
  });
};

export const getWorkStatusByUserId = (userId) => {
  return request(`http://localhost:8080/api/task/${userId}`, {
    method: "GET",
  });
};

import { request } from "../utils/requests.ts";

export const postUser = (userData) => {
  const response = request(`/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(userData),
  });
  return response;
};

export const PostWorkStatus = (workStatusData) => {
  return fetch(`/api/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(workStatusData),
  });
};

import { request } from "../utils/requests.ts";

export const postUser = (userData) => {
  return request(`/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(userData),
  });
};


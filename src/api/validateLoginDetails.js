import { request } from "../utils/requests.ts";

export const validateLoginDetails = (userData) => {
  const response = request(`/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(userData),
  });
  return response;
};
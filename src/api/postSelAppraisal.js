import { request } from "../utils/requests.ts";

export const postSelAppraisal = (userData) => {
  return request(`/api/selfAppraisal`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(userData),
  });
};


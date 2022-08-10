import { request } from "../utils/requests.ts";

export const saveFeedbackComment = (payload) => {
  return request(`/api/saveComment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(payload),
  });
};

import { request } from "../utils/requests.ts";

export const getFeedbackRecords = (userId) => {
  return request(`/api/allComments`, {
    method: "GET",
  });
};

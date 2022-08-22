import { request } from "../utils/requests.ts";

export const getSchedule = (userId) => {
  return request(`/api/schedule/${userId}`, {
    method: "GET",
  });
};

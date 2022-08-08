import { request } from "../utils/requests.ts";

export const getAllTasks = () => {
  return request(`/api/alltasks`, {
    method: "GET",
  });
};

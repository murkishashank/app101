import { request } from "../utils/requests.ts";

export const getAllTasks = () => {
  return request(`http://localhost:8080/api/alltasks`, {
    method: "GET",
  });
};

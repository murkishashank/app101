import { request } from "../utils/requests.ts";

export const getAllUser = () => {
  return request(`/api/allUsers`, {
    method: "GET",
  });
};

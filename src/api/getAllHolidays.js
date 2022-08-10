import { request } from "../utils/requests.ts";

export const getAllHolidays = () => {
  return request(`/api/allHolidays`, {
    method: "GET",
  });
};

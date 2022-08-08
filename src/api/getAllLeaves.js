import { request } from "../utils/requests.ts";

export const getAllLeaves = () => {

    const allUsersLeaves = request(
        `/api/allLeaves`
        , {
            method: "GET",
        }
    );
    return allUsersLeaves;
}

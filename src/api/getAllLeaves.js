import { request } from "../utils/requests.ts";

export const getAllLeaves = () => {

    const allUsersLeaves = request(
        `http://localhost:8080/api/allLeaves`
        , {
            method: "GET",
        }
    );
    return allUsersLeaves;
}

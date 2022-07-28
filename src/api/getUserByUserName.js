import { request } from "../utils/requests.ts";

export const getUser = (userName) => {
    const user = request(
        `http://localhost:8080/api/usersByUserName/${userName}`
        , {
            method: "GET",
        }
    );
    return user;
}
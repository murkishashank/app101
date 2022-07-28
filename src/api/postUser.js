import { request } from "../utils/requests.ts";

export const postUser = (userData) => {

    const response = request(
        `http://localhost:8080/api/users`
        , {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(userData),
        }
    );
    return response;
}

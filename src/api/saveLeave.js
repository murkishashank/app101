import { request } from "../utils/requests.ts";

export const saveLeave = (leaveData) => {

    const response = request(
        `http://localhost:8080/api/leave`
        , {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(leaveData),
        }
    );
    return response;
}
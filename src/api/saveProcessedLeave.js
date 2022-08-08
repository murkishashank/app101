import { request } from "../utils/requests.ts";

export const saveProcessedLeave = (userLeaveData) => {

    const response = request(
        `/api/leave`
        , {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(userLeaveData),
        }
    );
    return response;
}
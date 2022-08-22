import { request } from "../utils/requests.ts";

export const PostWorkStatus = (workStatusData) => {
    return request(`/api/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(workStatusData),
    })
};

import config from "../config";
import { getAuthToken } from "./authService";

export const updateUserProfile = async (username: string, firstName: string, lastName: string) => {
    const authToken = getAuthToken();
    const response = await fetch(`${config.API_URL}/users/my-profile`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, firstName: firstName, lastName: lastName })
    });
    const resObj = await response.json();
    if (response.status !== 200) {
        throw Error(resObj.message)
    }
    return resObj.message || null;
}
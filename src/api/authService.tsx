import config from "../config";
import { ILogInResponse } from "./interfaces/ILogInResponse";
import { IServerResponse } from "./interfaces/IServerResponse";
import { IUser } from "./interfaces/IUser";

// export const getAuthenticatedUser = (): IUser | null => {
// 	let user = localStorage.getItem("user");
// 	if (user) {
// 		return JSON.parse(user);
// 	}
// 	return null;
// };

export const getAuthToken = (): string | null => {
	let token = localStorage.getItem("accessToken");
	if (token) {
		return JSON.parse(token);
	}
	return null;
};

export const logIn = async (
	usernameOrEmail: string,
	password: string
): Promise<IUser | null> => {
	const response = await fetch(`${config.API_URL}/auth/signin`, {
		method: "POST",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({usernameOrEmail, password})
	});
	let resObj: IServerResponse<ILogInResponse> = await response.json();
	if (response.status !== 200) {
		console.log(resObj.message)
		throw Error(resObj.message)
	}
	localStorage.setItem("accessToken", JSON.stringify(resObj.content?.accessToken));
	return await getUserProfile();
};

export const getUserProfile = async (): Promise<IUser | null> => {
	const authToken = getAuthToken();
	const response = await fetch(`${config.API_URL}/users/my-profile`, {
		headers: authToken ? {
			"Authorization": `Bearer ${authToken}`,
			"Content-Type": "application/json",
		} : {},
	});
	let resObj: IServerResponse<IUser> = await response.json();
	if (response.status !== 200) {
		console.log(resObj.message);
		return null;
	};
	localStorage.setItem("user", JSON.stringify(resObj.content))
	console.log(resObj.content)
	return resObj.content || null;
};





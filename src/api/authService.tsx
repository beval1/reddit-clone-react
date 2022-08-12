import { IUser } from "./interfaces/IUser";

export const getAuthenticatedUser = (): IUser | null => {
	let user = localStorage.getItem("user");
	if (user) {
		return JSON.parse(user);
	}
    return null;
};

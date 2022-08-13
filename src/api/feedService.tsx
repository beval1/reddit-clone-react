import config from "../config";
import { IPost } from "./interfaces/IPost";
import { IServerResponse } from "./interfaces/IServerResponse";

export const getFeed = async (): Promise<IPost[] | null> => {
	let data: IServerResponse<IPost[]> | null = null;
	await fetch(`${config.API_URL}/get-feed`)
		.then(async (response) => {
			let resObj: IServerResponse<IPost[]> = await response.json();

			if (response.status === 200) {
				data = resObj;
			} else {
                throw resObj.message;
			}
		})
		.catch((err) => {
			console.log(err);
        });
    console.log(data);
    return data ? data['content'] : null;   
}

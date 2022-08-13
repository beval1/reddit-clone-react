import React from "react";
import { IPost } from "./interfaces/IPost";
import { IServerResponse } from "./interfaces/IServerResponse";

// const API_URL = process.env.REACT_APP_API_URL as RequestInfo;
const API_URL = "http://localhost:8084/api/v1";

export const getFeed = async (): Promise<IPost[] | null> => {
	let data: IServerResponse | null = null;
	await fetch(`${API_URL}/get-feed`)
		.then(async (response) => {
			let resObj: IServerResponse = await response.json();

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

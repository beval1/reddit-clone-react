import config from "../config";
import { IServerResponse } from "./interfaces/IServerResponse";

export const upvotePost = async (postId: number): Promise<string | null> => {
    return await votePost(postId, "upvote");
}

export const downvotePost = async (postId: number): Promise<string | null> => {
	return await votePost(postId, "downvote");
};

export const unvotePost = async (postId: number): Promise<string | null> => {
	return await votePost(postId, "unvote")
};

const votePost = async (postId: number, type: "upvote" | "unvote" | "downvote"): Promise<string | null> => {
	let data: IServerResponse | null = null;
	await fetch(`${config.API_URL}/posts/post/${postId}/${type}`, {method: "POST"})
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
	return data ? data["message"] : null;
};
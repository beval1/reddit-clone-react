import config from "../config";
import { IServerResponse } from "./interfaces/IServerResponse";
import { ICreatePost } from "./interfaces/ICreatePost";
import { getAuthToken } from "./authService";
import { IPost } from "./interfaces/IPost";

const linkRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

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
	const authToken = getAuthToken();
	await fetch(`${config.API_URL}/posts/post/${postId}/${type}`, {
		method: "POST",
		headers: {
			"Authorization": `Bearer ${authToken}`
		}
	})
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

export const createPost = async (subredditId: number | undefined, post: ICreatePost, postType: "text" | "image" | "link") => {
	if (!subredditId) {
		throw Error("You must specify subreddit!");
	}
	if (postType === "link" && post.link && !post.link.match(linkRegex)) {
		throw Error("Not a valid Link!");
	}
	if (postType === "image" && !post.image?.multipartFile) {
		throw Error("You must upload an image!");
	}

	let formData = new FormData();
	if (postType === "image") {
		formData.append("postTitle", post.title)
		if (post.image?.multipartFile) {
			formData.append("file", post.image?.multipartFile)
		}
	}

	const authToken = getAuthToken();
	const imageHeaders = {
		"Authorization": `Bearer ${authToken}`,
	};
	const otherHeaders = {
		"Authorization": `Bearer ${authToken}`,
		"Content-Type": "application/json",
	};

	const response = await fetch(`${config.API_URL}/posts/${postType}-post/${subredditId}`, {
		method: "POST",
		headers: postType === "image" ? imageHeaders : otherHeaders,
		body: postType === "image" ? formData : JSON.stringify(post),
	});
	const resObj: IServerResponse = await response.json();
	console.log(resObj.message);
	if (response.status !== 201) {
		throw Error(resObj.message);
	}
};

export const getPost = async (postId: string): Promise<IPost> => {
	const response = await fetch(`${config.API_URL}/posts/post/${postId}`);
	const resObj = await response.json();
	console.log(resObj)
	if (response.status != 200) {
		throw Error(resObj.message)
	}
	return resObj.content;
}
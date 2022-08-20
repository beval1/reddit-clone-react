import config from "../config"
import { getAuthToken } from "./authService";
import { IComment } from "./interfaces/IComment";

export const getAllCommentsForPost = async (postId: number, pageNumber?: number): Promise<IComment[]> => {
    const response = await fetch(`${config.API_URL}/comments/${postId}`);
    const resObj = await response.json();
    if (response.status !== 200) {
        throw Error(resObj.message)
    }
    return resObj.content.pageContent;
}

export const createCommentForPost = async (postId: number, commentContent: string): Promise<string | null> => {
    const authToken = getAuthToken();
    const response = await fetch(`${config.API_URL}/comments/${postId}`, {
        method: "post",
        headers: {
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({content: commentContent})
    });
    const resObj = await response.json();
    if (response.status !== 201) {
        throw Error(resObj.message)
    }
    return resObj.messgage || null;
}
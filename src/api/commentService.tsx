import config from "../config"
import { getAuthToken } from "./authService";
import { IComment } from "./interfaces/IComment";
import { IServerResponse } from "./interfaces/IServerResponse";

export const getAllCommentsForPost = async (postId: number, pageNumber?: number): Promise<IComment[]> => {
    const authToken = getAuthToken();
    const response = await fetch(`${config.API_URL}/comments/${postId}`, {
        headers: {"Authorization": `Bearer ${authToken}`}
    });
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
    return resObj.message || null;
}

export const createReply = async (commentId: number, commentContent: string): Promise<string | null> => {
    const authToken = getAuthToken();
    const response = await fetch(`${config.API_URL}/comments/comment/${commentId}`, {
        method: "post",
        headers: {
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: commentContent })
    });
    const resObj = await response.json();
    if (response.status !== 201) {
        throw Error(resObj.message)
    }
    return resObj.message || null;
}

export const editComment = async (commentId: number, commentContent: string): Promise<string | null> => {
    const authToken = getAuthToken();
    const response = await fetch(`${config.API_URL}/comments/comment/${commentId}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: commentContent })
    });
    const resObj = await response.json();
    if (response.status !== 200) {
        throw Error(resObj.message)
    }
    return resObj.message || null;
}

export const deleteComment = async (commentId: number): Promise<string | null> => {
    const authToken = getAuthToken();
    const response = await fetch(`${config.API_URL}/comments/comment/${commentId}`, {
        method: "delete",
        headers: {
            "Authorization": `Bearer ${authToken}`,
        },
    });
    const resObj = await response.json();
    if (response.status !== 200) {
        throw Error(resObj.message)
    }
    return resObj.message || null;
}

export const upvoteComment = async (postId: number): Promise<string | null> => {
    return await voteComment(postId, "upvote");
}

export const downvoteComment = async (postId: number): Promise<string | null> => {
    return await voteComment(postId, "downvote");
};

export const unvoteComment = async (postId: number): Promise<string | null> => {
    return await voteComment(postId, "unvote")
};

const voteComment = async (postId: number, type: "upvote" | "unvote" | "downvote"): Promise<string | null> => {
    let data: IServerResponse | null = null;
    const authToken = getAuthToken();
    await fetch(`${config.API_URL}/comments/comment/${postId}/${type}`, {
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
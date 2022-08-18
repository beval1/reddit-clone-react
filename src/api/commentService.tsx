import config from "../config"
import { IComment } from "./interfaces/IComment";

export const getAllCommentsForPost = async (postId: string, pageNumber?: number): Promise<IComment[]> => {
    const response = await fetch(`${config.API_URL}/comments/${postId}`);
    const resObj = await response.json();
    if (response.status != 200) {
        throw Error(resObj.message)
    }
    return resObj.content.pageContent;
}
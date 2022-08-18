import config from "../config"
import { getAuthToken } from "./authService";
import { IServerResponse } from "./interfaces/IServerResponse";
import { ISubreddit } from "./interfaces/ISubreddit";


export const getSubreddit = async (subredditId: number): Promise<ISubreddit> => {
    const response = await fetch(`${config.API_URL}/subreddits/subreddit/${subredditId}`)
    const resObj: IServerResponse<ISubreddit> = await response.json();
    if (response.status !== 200 || !resObj.content) {
        throw Error(resObj.message)
    }
    return resObj.content;
}

export const joinSubreddit = async (subredditId: number): Promise<void> => {
    const token = getAuthToken();
    const response = await fetch(`${config.API_URL}/subreddits/join/${subredditId}`, {
        method: "post",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    const resObj: IServerResponse<ISubreddit> = await response.json();
    if (response.status !== 200) {
        throw Error(resObj.message)
    }
    console.log(resObj.message)
}
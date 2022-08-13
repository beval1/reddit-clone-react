import internal from "stream";
import { IAuthor } from "./IAuthor";
import { ISubreddit } from "./ISubreddit";

export interface IPost {
    author: IAuthor,
    subreddit: ISubreddit
    title: string,
    content?: string,
    type: "image" | "text",
    downvotedByUser: boolean,
    upvotedByUser: boolean,
    commentsCount: number,
    updatedOn: Date,
    createdOn: Date,
}
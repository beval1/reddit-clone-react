import internal from "stream";
import { IAuthor } from "./IAuthor";
import { ISubreddit } from "./ISubreddit";

export interface IPost {
    id: number,
    author: IAuthor,
    subreddit: ISubreddit
    title: string,
    content?: string,
    type: "image" | "text",
    downvotedByUser: boolean,
    upvotedByUser: boolean,
    commentsCount: number,
    votes: number,
    updatedOn: Date,
    createdOn: Date,
}
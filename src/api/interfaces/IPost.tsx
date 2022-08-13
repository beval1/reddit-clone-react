import { IAuthor } from "./IAuthor";
import { ISubreddit } from "./ISubreddit";

export interface IPost {
    id: number,
    author: IAuthor,
    subreddit: ISubreddit
    title: string,
    content?: string,
    type: "image" | "text" | "link",
    downvotedByUser: boolean,
    upvotedByUser: boolean,
    commentsCount: number,
    votes: number,
    updatedOn: string,
    createdOn: string,
}
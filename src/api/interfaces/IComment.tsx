import { IAuthor } from "./IAuthor";

export interface IComment {
    id: number;
    content: string;
    createdOn: string;
    updatedOn: string;
    author: IAuthor;
    replies: IComment[];
    repliesCount: number;
}
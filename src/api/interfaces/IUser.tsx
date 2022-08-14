import { ISubreddit } from "./ISubreddit";

export interface IUser {
    username: string,
    email: string,
    firstName: string | null,
    lastName: string | null,
    gender: "male" | "female" | null,
    birthdate: Date | null,
    postKarma: number,
    commentKarma: number,
    awardeeKarma: number,
    awarderKarma: number,
    totalKarma: number,
    profileImage: string | null,
    bannerImage: string | null,
    subreddits: ISubreddit[],
    status: "online" | "offline",
}
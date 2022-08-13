export interface IAuthor {
    id: number,
    username: string,
    awardeeKarma: number,
    awarderKarma: number,
    commentKarma: number,
    postKarma: number,
    profileImage: string | null,
}
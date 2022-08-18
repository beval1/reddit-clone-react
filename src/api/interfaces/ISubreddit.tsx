export interface ISubreddit {
    id: number,
    name: string,
    description: string,
    mainImage: string | null,
    backgroundImage: string | null,
    membersCount: number,
    createdOn: string,
}
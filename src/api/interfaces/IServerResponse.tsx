export interface IServerResponse<T=Object> {
    message?: string,
    content?: T,
    timestamp: Date
}
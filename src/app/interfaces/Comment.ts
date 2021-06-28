export interface Comment{
    id: number,
    parentCommentId: number,
    ownerId: number,
    txt: string,
    createdAt: Date,
    deletedAt: Date
}
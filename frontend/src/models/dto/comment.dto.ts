export default interface CommentDto {
    commentId: number;

    login: string;

    comment: string;
}

export interface FetchCommentsDto {
    comments: CommentDto[],

    length: number;
}
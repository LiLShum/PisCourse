import $api from "../http";
import AddCommentDto from "../models/dto/add-comment.dto";
import {AxiosResponse} from "axios";
import CommentDto, {FetchCommentsDto} from "../models/dto/comment.dto";

export default class CommentService {
    static async fetchComments(saunaId: string, limit: number, offset: number) : Promise<AxiosResponse<FetchCommentsDto>> {
        return $api.get(`http://localhost:4000/comments/${saunaId}/${limit}/${offset}`);
    }

    static async addComment(commentDto: AddCommentDto) {
            return $api.post('http://localhost:4000/comments', commentDto);
    }

    static async deleteComment(saunaId: number) : Promise<AxiosResponse<CommentDto[]>> {
        return $api.delete(`http://localhost:4000/comments/${saunaId}`);
    }
}
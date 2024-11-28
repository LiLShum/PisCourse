import {Body, Controller, Delete, Get, Inject, Param, Post} from "@nestjs/common";
import AddCommentDto from "./dto/add-comment.dto";
import CommentService from "./comment.service";

@Controller('comments')
export default class CommentController {
    constructor(@Inject() private readonly commentService: CommentService) {
    }
    @Post()
    async addComment(@Body() commentDto: AddCommentDto) {
        console.log('hello');
        return this.commentService.addComment(commentDto);
    }

    @Get('/:saunaId')
    async fetchComments(@Param('saunaId') saunaId: string) {
        return this.commentService.fetchComments(+saunaId);
    }

    @Delete('/:saunaId')
    async deleteComment(@Param('saunaId') saunaId: string) {
        console.log(saunaId);
        return this.commentService.deleteComment(+saunaId);
    }
}
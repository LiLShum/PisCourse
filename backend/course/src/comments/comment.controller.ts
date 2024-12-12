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

    @Get('/:saunaId/:limit/:offset')
    async fetchComments(@Param('saunaId') saunaId: string, @Param('limit') limit: number, @Param('offset') offset: number) {
        return this.commentService.fetchComments(+saunaId, limit, offset);
    }

    @Delete('/:saunaId')
    async deleteComment(@Param('saunaId') saunaId: string) {
        console.log(saunaId);
        return this.commentService.deleteComment(+saunaId);
    }
}
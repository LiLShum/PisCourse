import {Injectable} from "@nestjs/common";
import AddCommentDto from "./dto/add-comment.dto";
import {InjectRepository} from "@nestjs/typeorm";
import Comments from "../entities/comments.entity";
import {Repository} from "typeorm";
import Sauna from "../entities/sauna.entity";
import User from "../entities/user.entity";
import CommentDto from "./dto/comment.dto";

@Injectable()
export default class CommentService {
    constructor(@InjectRepository(Comments) private readonly commentsRepository: Repository<Comments>,
                @InjectRepository(Sauna) private readonly saunaRepository: Repository<Sauna>,
                @InjectRepository(User) private readonly userRepository: Repository<User>) {
    }
    async addComment(commentDto: AddCommentDto) {
        const commentValue = commentDto.comment;

        const sauna = await this.saunaRepository.findOne({
            where: {
                saunaId: +commentDto.saunaId,
            }
        })

        const user = await this.userRepository.findOne({
            where: {
                login: commentDto.login,
            }
        })

        const comment = {
            sauna: sauna,
            user: user,
            comment: commentValue,
        }

        const createdComment =  this.commentsRepository.create(comment);
        await this.commentsRepository.save(createdComment);
        console.log(createdComment);
        return createdComment;
    }

    async fetchComments(saunaId: number, limit: number, offset: number) {
        const comments = await this.commentsRepository.find({
            relations: {
                user: true,
            },
            where: {
                sauna: {
                    saunaId: saunaId
                }
            },
            take: limit,
            skip: offset
        });

        const commentLength = (await this.commentsRepository.find({
            where: {
                sauna: {
                    saunaId: saunaId
                }
            },
        })).length;

        const commentsWithLogins: CommentDto[] = await Promise.all(
            comments.map(async (comment) => {
                const user = await this.userRepository.findOne({
                    where: {
                        userId: comment.user.userId,
                    },
                });

                return {
                    comment: comment.comment,
                    commentId: comment.commentId,
                    login: user.login,
                } as CommentDto;
            })
        );

        return {comments: commentsWithLogins, length: commentLength};
    }


    async deleteComment(CommentId: number) {
        await this.commentsRepository.delete({
            commentId: CommentId
        });
    }
}
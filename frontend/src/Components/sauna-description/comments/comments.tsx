import React, { FC, useContext, useEffect, useState } from "react";
import styles from "./comments.module.css";
import {Pagination, Textarea} from "@nextui-org/react";
import { Context } from "../../../index";
import CommentDto from "../../../models/dto/comment.dto";
import AddCommentDto from "../../../models/dto/add-comment.dto";
import {useNavigate, useParams} from "react-router-dom";

const Comments: FC = () => {
    const { store } = useContext(Context);
    const { saunaId } = useParams<{ saunaId: string }>();
    const commentsLimit = 3;
    const [commentsOffset, setCommentsOffset] = useState<number>(0);
    const [comments, setComments] = useState<CommentDto[]>([]);
    const [commentInput, setCommentInput] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [commentLength, setCommentLength] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        store.fetchComments(saunaId as string, commentsLimit, commentsOffset).then((value) => {
            setComments(value.data.comments);
            setCommentLength(value.data.length);
        });
    }, [comments]);

    const addComment = () => {
        if (commentInput.trim() !== "") {
            const comment: AddCommentDto = {
                comment: commentInput,
                login: store.user.login,
                saunaId: saunaId as string,
            };
            store.addComment(comment).then(() => {
                setCommentInput("");
                store.fetchComments(saunaId as string,commentsLimit, commentsOffset).then((value) => {
                    setComments(value.data.comments);
                });
            });
        }
    };
    const changePage = (page: number) => {
        setCommentsOffset((page-1) * commentsLimit);
        store.fetchComments(saunaId as string, commentsLimit, (page-1) * commentsLimit)
            .then((res) => setComments(res.data.comments));
        setCurrentPage(page);
    }
    return (
        <div>
            <div>
                <Textarea
                    id="commentInput"
                    variant="bordered"
                    label="Оставьте свой комментарий"
                    value={commentInput} 
                    onChange={(e) => setCommentInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            if(store.isAuth) {
                                addComment();
                            }
                            else {
                                navigate('/auth')
                            }
                        }
                    }}
                />
            </div>
            <div className={styles.commentsWrapper}>
                {comments.length !== 0 ? (
                        comments.map((value) => (
                        <div style={{ width: "50%" }} key={value.commentId}>
                            <div>
                                <Textarea
                                    isReadOnly
                                    label={value.login}
                                    labelPlacement="inside"
                                    value={value.comment}
                                    variant="bordered"
                                    className={styles.userComments}
                                />
                                {store.user.role === "admin" && (
                                    <button
                                        id="deleteCommentButton"
                                        data-commentid={value.commentId}
                                        onClick={() => {
                                            store.deleteComment(value.commentId).then(() => {
                                                store.fetchComments(saunaId as string, commentsLimit, commentsOffset).then((value) => {
                                                    setComments(value.data.comments);
                                                    setCommentLength(commentLength-1);
                                                    changePage(1);
                                                });
                                            });
                                        }}
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <h4>Станьте первым кто оставит здесь комментарий</h4>
                )}
            </div>
           <div className={styles.pagination}>
               {commentLength !== 0 &&
                   <Pagination   showControls
                                 disableCursorAnimation
                                 total={Math.ceil(commentLength / commentsLimit)}
                                 page={currentPage}
                                 onChange={changePage}
                   />
               }
           </div>
        </div>
    );
};

export default Comments;

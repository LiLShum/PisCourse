import React, { FC, useContext, useEffect, useState } from "react";
import styles from "./comments.module.css";
import { Textarea } from "@nextui-org/react";
import { Context } from "../../../index";
import CommentDto from "../../../models/dto/comment.dto";
import AddCommentDto from "../../../models/dto/add-comment.dto";
import { useParams } from "react-router-dom";

const Comments: FC = () => {
    const { store } = useContext(Context);
    const { saunaId } = useParams<{ saunaId: string }>();

    const [comments, setComments] = useState<CommentDto[]>([]);
    const [commentInput, setCommentInput] = useState<string>("");

    useEffect(() => {
        store.fetchComments(saunaId as string).then((value) => {
            setComments(value.data);
        });
    }, [saunaId, store]);

    const addComment = () => {
        if (commentInput.trim() !== "") {
            const comment: AddCommentDto = {
                comment: commentInput,
                login: store.user.login,
                saunaId: saunaId as string,
            };
            store.addComment(comment).then(() => {
                setCommentInput("");
                store.fetchComments(saunaId as string).then((value) => {
                    setComments(value.data);
                });
            });
        }
    };

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
                            addComment();
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
                                                store.fetchComments(saunaId as string).then((value) => {
                                                    setComments(value.data);
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
        </div>
    );
};

export default Comments;

import { Avatar, Card, Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useState } from 'react'
import { IComment } from '../api/interfaces/IComment'
import { calculateTimePassed } from '../utils/utility'
// import ThumbUpIcon from "@mui/icons-material/ThumbUp";
// import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import QuickreplyOutlinedIcon from '@mui/icons-material/QuickreplyOutlined';
import { ModalContext, UserContext } from '../App'
import { deleteComment, downvoteComment, unvoteComment, upvoteComment } from '../api/commentService'
import ReplyEditCommentModal from '../pages/comments/ReplyEditCommentModal'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type CommentCardProps = {
    comment: IComment
    setComments: () => void
}

const CommentCard = (props: CommentCardProps) => {
    const [upvoted, setUpvoted] = useState<boolean>(props.comment.upvotedByUser);
    const [downvoted, setDownvoted] = useState<boolean>(
        props.comment.downvotedByUser
    );
    const [modal, setModal] = useState<"edit" | "reply" | null>(null);
    const userContext = useContext(UserContext)
    const modalContext = useContext(ModalContext)

    const handleUpvote = (commentId: number) => {
        if (!userContext.user) {
            modalContext.setShowLoginRegisterModal("register");
            return;
        }
        if (upvoted) {
            unvoteComment(commentId).then(() => setUpvoted(false));
        } else {
            upvoteComment(commentId).then(() => {
                props.comment.votes++;
                setDownvoted(false);
                setUpvoted(true);
            });
        }
    };
    const handleDownvote = (commentId: number) => {
        if (!userContext.user) {
            modalContext.setShowLoginRegisterModal("register");
            return;
        }

        if (downvoted) {
            unvoteComment(commentId).then(() => setDownvoted(false));
        } else {
            downvoteComment(commentId).then(() => {
                props.comment.votes--;
                setDownvoted(true);
                setUpvoted(false);
            });
        }
    };

    const handleReply = () => {
        if (!userContext.user) {
            modalContext.setShowLoginRegisterModal("register");
            return;
        }

        setModal("reply");
    }

    const handleDelete = () => {
        deleteComment(props.comment.id);
        props.setComments();
    }

    const handleEdit = () => {
        setModal("edit");
    }

    const listReplies = () => {
        props.comment.replies = props.comment.replies.sort((a, b) => a.votes - b.votes).reverse();
        return props.comment.replies.map((r) => <CommentCard key={r.id} comment={r} setComments={props.setComments} />)
    }

    return (
        <Box margin="10px">
            <Box>
                <ReplyEditCommentModal modal={modal} setModal={setModal} comment={props.comment} setComments={props.setComments}></ReplyEditCommentModal>
                <Box display="flex" flexDirection="row">
                    <Box className="left-bar" display="flex" flexDirection="column" alignItems="center">
                        <Avatar
                            alt={props.comment.author.username}
                            src={props.comment.author.profileImage || ""}
                            variant="circular"
                            sx={{
                                width: 30,
                                height: 30,
                                marginRight: "5px",
                            }}
                        />
                        <Divider orientation="vertical" sx={{
                            marginRight: "4px",
                        }}></Divider>
                    </Box>
                    <Box className="general-comment-info" display="flex" flexDirection="column" gap="7px" marginTop="4px">
                        <Box display="flex" gap="5px">
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                fontWeight="bold"
                            >
                                {`${props.comment.author.username} - `}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                {`${calculateTimePassed(props.comment.createdOn)}`}
                            </Typography>
                            {props.comment.author.id === userContext?.user?.id ?
                                <Box display="flex" gap="5px">
                                    <EditIcon fontSize="small" onClick={handleEdit} className="box-hover" sx={{ padding: "3px" }} />
                                    <DeleteIcon fontSize="small" onClick={handleDelete} className="box-hover" sx={{ padding: "3px" }} />
                                </Box> : null}
                        </Box>
                        <Box className="comment-content">
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                {props.comment.content}
                            </Typography>
                        </Box>
                        <Box
                            display="flex"
                            flexDirection="row"
                            gap="12px"
                            alignItems="center"
                        >
                            <ThumbUpAltOutlinedIcon
                                fontSize="small"
                                onClick={() => handleUpvote(props.comment.id)}
                                sx={(theme) => ({
                                    fill: upvoted
                                        ? theme.palette.info.main
                                        : null,
                                })}
                            />
                            <Typography variant="body2" color="text.secondary">
                                {props.comment.votes}
                            </Typography>
                            <ThumbDownAltOutlinedIcon
                                fontSize="small"
                                onClick={() => handleDownvote(props.comment.id)}
                                sx={(theme) => ({
                                    fill: downvoted
                                        ? theme.palette.info.main
                                        : null,
                                })}
                                className="box-hover"
                            />
                            <Box
                                display="flex"
                                gap="3px"
                                className="box-hover"
                                onClick={() => handleReply()}
                                padding="5px">
                                <QuickreplyOutlinedIcon
                                    fontSize="small"
                                />
                                <Typography variant="body2" color="text.secondary">
                                    Reply
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" className="box-hover" sx={{ padding: "5px" }}>
                                Share
                            </Typography>
                            <Typography variant="body2" color="text.secondary" className="box-hover" sx={{ padding: "5px" }}>
                                Report
                            </Typography>
                            <Typography variant="body2" color="text.secondary" className="box-hover" sx={{ padding: "5px" }}>
                                Save
                            </Typography>
                            <Typography variant="body2" color="text.secondary" className="box-hover" sx={{ padding: "5px" }}>
                                Follow
                            </Typography>
                        </Box>
                        <Box className="replies">
                            {props.comment.replies ? listReplies() : null}
                        </Box>
                    </Box>
                </Box>
            </Box >

        </Box>
    );
}

export default CommentCard
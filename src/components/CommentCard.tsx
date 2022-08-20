import { Avatar, Card, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useState } from 'react'
import { IComment } from '../api/interfaces/IComment'
import { calculateTimePassed } from '../utils/utility'
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { ModalContext, UserContext } from '../App'
import { downvoteComment, unvoteComment, upvoteComment } from '../api/commentService'

type CommentCardProps = {
    comment: IComment
}

const CommentCard = (props: CommentCardProps) => {
    const [upvoted, setUpvoted] = useState<boolean>(props.comment.upvotedByUser);
    const [downvoted, setDownvoted] = useState<boolean>(
        props.comment.downvotedByUser
    );
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
                setDownvoted(true);
                setUpvoted(false);
            });
        }
    };

    return (
        <Box margin="10px">
            <Box display="flex" flexDirection="row">
                <Box className="left-bar" display="flex" flexDirection="column">
                    <Avatar
                        alt={props.comment.author.username}
                        src={props.comment.author.profileImage || ""}
                        variant="circular"
                        sx={{
                            width: 24,
                            height: 24,
                            marginRight: "5px",
                        }}
                    />
                </Box>
                <Box className="general-comment-info" display="flex" flexDirection="column" gap="7px">
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
                        gap="5px"
                        alignItems="center"
                    >
                        <ThumbUpIcon
                            fontSize="small"
                            onClick={() => handleUpvote(props.comment.id)}
                            sx={(theme) => ({
                                fill: upvoted
                                    ? theme.palette.info.main
                                    : null,
                            })}
                        />
                        <Typography variant="body2" color="text.secondary">
                            {upvoted ? props.comment.votes + 1 : null}
                            {downvoted ? props.comment.votes - 1 : null}
                            {!downvoted && !upvoted
                                ? props.comment.votes
                                : null}
                        </Typography>
                        <ThumbDownIcon
                            fontSize="small"
                            onClick={() => handleDownvote(props.comment.id)}
                            sx={(theme) => ({
                                fill: downvoted
                                    ? theme.palette.info.main
                                    : null,
                            })}
                        />
                    </Box>
                </Box>
            </Box>
        </Box >
    );
}

export default CommentCard
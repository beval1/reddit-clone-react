import { Avatar, Card, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { IComment } from '../api/interfaces/IComment'
import { calculateTimePassed } from '../utils/utility'

type CommentCardProps = {
    comment: IComment
}

const CommentCard = (props: CommentCardProps) => {
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
                <Box className="content">
                    <Box className="general-comment-info">
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
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default CommentCard
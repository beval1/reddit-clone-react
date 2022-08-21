import { Avatar, Box, Button, Card, Divider, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { ISubreddit } from '../api/interfaces/ISubreddit'
import { getSubreddit, joinSubreddit } from '../api/subredditService'
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import { ModalContext, UserContext } from '../App';
import { isUserAlreadyJoinedSubreddit, transformDate } from '../utils/utility';
import { getUserProfile } from '../api/authService';
import { useNavigate } from 'react-router-dom';

type Props = {
    subreddit: ISubreddit | null
}

const SubredditInfoCard = (props: Props) => {
    const userContext = useContext(UserContext);
    const modalContext = useContext(ModalContext);
    const navigate = useNavigate();

    const handleJoin = () => {
        if (!userContext.user) {
            modalContext.setShowLoginRegisterModal("register");
            return;
        }

        if (props.subreddit) {
            joinSubreddit(props.subreddit.id).then(() => {
                getUserProfile().then(user => userContext.setUser(user))
            })
        }
    };


    return (
        <Box >
            <Card>
                <Box display="flex" flexDirection="column" width="100%" >
                    <Box sx={(theme) => ({
                        backgroundColor: theme.palette.secondary.main,
                        padding: "15px"
                    })}>
                        <Typography variant="body1" fontWeight="bold" color="primary">About Community</Typography>
                    </Box>
                    <Box className="avatar" display="flex" alignItems="center">
                        <Avatar
                            alt={props.subreddit?.name}
                            src={props.subreddit?.mainImage || ""}
                            variant="circular"
                            sx={{
                                width: 50,
                                height: 50,
                                margin: "10px",
                            }}
                        />
                        <Typography variant="body1" fontWeight="bold">{`r/${props.subreddit?.name}`}</Typography>
                    </Box>
                    <Box className="description" padding="10px">
                        <Typography variant="caption" sx={{
                            wordWrap: "break-word"
                        }}>{`${props.subreddit?.description}`}</Typography>
                    </Box>
                    <Box className="members" display="flex" gap="60px" padding="10px">
                        <Box className="total-members">
                            <Box display="flex" flexDirection="column">
                                <Typography variant="body2" fontWeight="bold">{`${props.subreddit?.membersCount}`}</Typography>
                                <Typography variant="body2">Members</Typography>
                            </Box>
                        </Box>
                        <Box className="online-members">
                            <Box display="flex" flexDirection="column">
                                {/* TODO: Not implemented yet... */}
                                <Typography variant="body2" fontWeight="bold">0</Typography>
                                <Typography variant="body2">Online</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box width="100%" padding="10px">
                        <Divider sx={{
                            marginBottom: "10px"
                        }}></Divider>
                        <Box display="flex" alignItems="center" gap="10px">
                            <CakeOutlinedIcon fontSize="large"></CakeOutlinedIcon>
                            <Typography variant="body2" fontWeight="bold">{transformDate(props.subreddit?.createdOn)}</Typography>
                        </Box>
                        <Box width="100%" display="flex" justifyContent="center">
                        {isUserAlreadyJoinedSubreddit(userContext.user, props.subreddit) ?
                            <Box width="100%" margin="15px 0">
                            <Button sx={{
                                margin: "0 auto",
                                width: "100%",
                                borderRadius: "25px"
                            }}
                                size="large"
                                color="secondary"
                                variant="contained"
                                onClick={() => navigate("/create-post/text")}
                            >Create Post</Button>
                        </Box> : <Box width="100%" margin="15px 0">
                            <Button sx={{
                                margin: "0 auto",
                                width: "100%",
                                borderRadius: "25px"
                            }}
                                size="large"
                                color="secondary"
                                variant="contained"
                                onClick={handleJoin}
                            >Join</Button>
                                </Box>}
                        </Box>
                    </Box>

                </Box>
            </Card>
        </Box>
    )
}

export default SubredditInfoCard


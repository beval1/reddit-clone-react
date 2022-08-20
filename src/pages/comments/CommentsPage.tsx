import { Box, Button, Card, Divider, InputBase, TextField } from '@mui/material'
import React, { useContext, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createCommentForPost, getAllCommentsForPost } from '../../api/commentService'
import { IComment } from '../../api/interfaces/IComment'
import { IPost } from '../../api/interfaces/IPost'
import { ISubreddit } from '../../api/interfaces/ISubreddit'
import { getPost } from '../../api/postService'
import { getSubreddit } from '../../api/subredditService'
import { ModalContext, UserContext } from '../../App'
import CommentCard from '../../components/CommentCard'
import { PostCard } from '../../components/PostCard'
import { RedditTextField } from '../../components/RedditTextField'
import SubredditBanner from '../../components/SubredditBanner'
import SubredditInfoCard from '../../components/SubredditInfoCard'

const CommentsPage = () => {
    const { postId } = useParams();
    const [comments, setComments] = useState<IComment[]>([]);
    const [originalPost, setOriginalPost] = useState<IPost | null>(null);
    const [subreddit, setSubreddit] = useState<ISubreddit | null>(null);
    const [commentContent, setCommentContent] = useState<string>("");
    const userContext = useContext(UserContext)
    const modalContext = useContext(ModalContext)
    const commentRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        if (!postId) {
            return;
        }

        if (!originalPost) {
            getPost(postId).then((post: IPost | null) => {
                setOriginalPost(post)
            }).catch(error => console.log(error.message))
        }

        if (originalPost) {
            getSubreddit(originalPost?.subreddit.id).then(data => {
                console.log(data)
                setSubreddit(data)
            }).catch(error => console.log(error));
            loadComments();
        }
    }, [originalPost])

    const loadComments = () => {
        if (originalPost) {
            getAllCommentsForPost(originalPost.id).then(data => {
                //comparing content is very, very bad idea...
                //but theoretically there shouldn't be two posts with exactly the same content
                data = data.filter(c => {
                    if (c.content.trim() !== originalPost.content?.trim()) {
                        return true;
                    }
                    return false;
                })
                data = data.sort((a, b) => a.votes - b.votes).reverse();
                console.log(data)
                setComments(data);
            }).catch(error => console.log(error.message))
        }
    }

    const handleComment = () => {
        if (!userContext || !userContext?.user) {
            modalContext.setShowLoginRegisterModal("register")
        } else {
            createCommentForPost(Number(postId), commentContent).then(() => {
                setCommentContent("");
                if (commentRef.current) {
                    commentRef.current.value = "";
                }
                loadComments()
            }).catch(error => console.log(error.message))
        }
    }

    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.value !== "") {
            setCommentContent(e.target.value)
        }
    }

    return (
        <Box>
            {originalPost && comments ? (
                <Box>
                    <Box>
                        {/* <SubredditBanner subreddit={subreddit}></SubredditBanner> */}
                    </Box>
                    <Box display="flex" flexDirection="row" gap="15px">
                        <Box width="100%" display="flex" flexDirection="column" flexBasis="70%" maxWidth="70%">
                            <PostCard post={originalPost}></PostCard>
                            <Box className="comments-wrapper" marginTop="20px">
                                <Card>
                                    <Box sx={{
                                        margin: "15px auto",
                                        width: "80%",
                                    }}>
                                        <RedditTextField
                                            multiline
                                            rows={6}
                                            placeholder="What are your thoughts?"
                                            variant='filled'
                                            fullWidth
                                            sx={{
                                                margin: "0 auto"
                                            }}
                                            onChange={(e) => handleCommentChange(e)}
                                            inputRef={commentRef}
                                        ></RedditTextField>
                                        <Box marginTop="5px" sx={{
                                            display: "flex",
                                            justifyContent: "flex-end"
                                        }}>
                                            <Button
                                                variant="contained"
                                                color="info"
                                                onClick={handleComment}
                                                disabled={commentContent ? false : true}
                                            >
                                                Comment
                                            </Button>
                                        </Box>
                                    </Box>
                                    <Divider></Divider>
                                    {comments.map((c) => <CommentCard key={c.id} comment={c} setComments={loadComments} />)}
                                </Card>
                            </Box>
                        </Box>
                        <Box className="right-bar" flexBasis="30%" maxWidth="30%">
                            <SubredditInfoCard subreddit={subreddit}></SubredditInfoCard>
                        </Box>
                    </Box>
                </Box>) : null}
        </Box>
    )
}

export default CommentsPage
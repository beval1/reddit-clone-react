import { Box, Card } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAllCommentsForPost } from '../../api/commentService'
import { IComment } from '../../api/interfaces/IComment'
import { IPost } from '../../api/interfaces/IPost'
import { ISubreddit } from '../../api/interfaces/ISubreddit'
import { getPost } from '../../api/postService'
import { getSubreddit } from '../../api/subredditService'
import CommentCard from '../../components/CommentCard'
import { PostCard } from '../../components/PostCard'
import SubredditBanner from '../../components/SubredditBanner'
import SubredditInfoCard from '../../components/SubredditInfoCard'

const CommentsPage = () => {
    const { postId } = useParams();
    const [comments, setComments] = useState<IComment[]>([]);
    const [originalPost, setOriginalPost] = useState<IPost | null>(null);
    const [subreddit, setSubreddit] = useState<ISubreddit | null>(null);


    useEffect(() => {
        if (postId) {
            getAllCommentsForPost(postId).then(data => {
                setComments(data);
            }).catch(error => console.log(error.message))
            getPost(postId).then((post: IPost | null) => {
                setOriginalPost(post);
                if (post) {
                    getSubreddit(post?.subreddit.id).then(data => {
                        console.log(data)
                        setSubreddit(data)
                    }).catch(error => console.log(error));
                } 
            }).catch(error => console.log(error.message))
            
        }
    }, [])

    return (
        <Box>
            {originalPost && comments ? (
                <Box>
                    <Box>
                        {/* <SubredditBanner subreddit={subreddit}></SubredditBanner> */}
                    </Box>
                    <Box display="flex" flexDirection="row" flexBasis="60%" gap="15px">
                        <Box width="100%">
                            <PostCard post={originalPost}></PostCard>
                            <Box className="comments-wrapper">
                                <Card>
                                    {comments.map((c) => <CommentCard key={c.id} comment={c} />)}
                                </Card>
                            </Box>
                        </Box>
                        <Box className="right-bar" flexBasis="40%" width="100%">
                            <SubredditInfoCard subreddit={subreddit}></SubredditInfoCard>
                        </Box>
                    </Box>
                </Box>) : null}
        </Box>
    )
}

export default CommentsPage
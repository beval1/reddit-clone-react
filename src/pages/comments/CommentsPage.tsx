import { Box, Card } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAllCommentsForPost } from '../../api/commentService'
import { IComment } from '../../api/interfaces/IComment'
import { IPost } from '../../api/interfaces/IPost'
import { getPost } from '../../api/postService'
import CommentCard from '../../components/CommentCard'
import { PostCard } from '../../components/PostCard'

type Props = {}

const CommentsPage = (props: Props) => {
    const { postId } = useParams();
    const [comments, setComments] = useState<IComment[]>([]);
    const [originalPost, setOriginalPost] = useState<IPost | null>(null);

    useEffect(() => {
        if (postId) {
            getAllCommentsForPost(postId).then(data => {
                setComments(data);
                console.log(data)
            }).catch(error => console.log(error.message))
            getPost(postId).then(data => {
                setOriginalPost(data);
                console.log(data)
            }).catch(error => console.log(error.message))
        }
    }, [])

    return (
        <Box>
            {originalPost && comments ? (
                <Box>
                    <Box display="flex" flexDirection="row" flexBasis="70%">
                        <Box width="100%">
                            <PostCard post={originalPost}></PostCard>
                            <Box className="comments-wrapper">
                                <Card>
                                    {comments.map((c) => <CommentCard key={c.id} comment={c} />)}
                                </Card>
                            </Box>
                        </Box>
                        <Box className="right-bar" flexBasis="30%">
                            
                        </Box>
                    </Box>
                </Box>) : null}
        </Box>
    )
}

export default CommentsPage
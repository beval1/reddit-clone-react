import { Box } from '@mui/material'
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
    const [originalPost, setOriginalPost] = useState<IPost>({} as IPost);

    useEffect(() => {
        if (postId) {
            getAllCommentsForPost(postId).then(data => {
                setComments(data);
            }).catch(error => console.log(error.message))
            getPost(postId).then(data => {
                setOriginalPost(data);
            }).catch(error => console.log(error.message))
        }
    }, [])

    return (
        <Box>
            <PostCard post={originalPost}></PostCard>
            <Box className="comments-wrapper">
                {comments ? comments.map((c) => <CommentCard key={c.id} comment={c} />) : null }
            </Box>
        </Box>
    )
}

export default CommentsPage
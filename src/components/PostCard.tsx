import * as React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { IPost } from "../api/interfaces/IPost";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import RedoIcon from "@mui/icons-material/Redo";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";

type PostCardProps = {
	post: IPost
}

export const PostCard = (props: PostCardProps) => {
	//future functionality
	const displayAwards = () => {return null};

	const calculateTimePassed = () => {

	}

	return (
		<Card sx={{ maxWidth: "lg", padding: "0 0" }}>
			<Box>
				<Box display="flex" flexDirection="row" gap="5px">
					<Box
						className="vote-actions"
						sx={{
							backgroundColor: "#F8F9FA",
						}}
						padding="10px 20px"
					>
						<Box
							display="flex"
							flexDirection="column"
							gap="5px"
							alignItems="center"
						>
							<ThumbUpIcon fontSize="small" />
							<Typography variant="body2" color="text.secondary">
								{props.post.votes}
							</Typography>
							<ThumbDownIcon fontSize="small" />
						</Box>
					</Box>
					<Box className="content">
						<Box className="general-post-info" display="flex" alignItems="center">
							<Typography variant="body2" color="text.secondary">
								{`r/${props.post.subreddit.name} * Posted by u/${props.post.author.username} ${calculateTimePassed()} ${displayAwards() || ""}`}
							</Typography>
						</Box>
						<Box className="post-content" marginBottom="20px">
							<Typography
								gutterBottom
								variant="h5"
								component="div"
							>
								{props.post.title}
							</Typography>
							<Typography variant="body2" color="text.secondary">
								{props.post.content}
							</Typography>
						</Box>
						<Box className="post-actions" display="flex" flexDirection="row">
							<ChatBubbleOutlineOutlinedIcon />{props.post.commentsCount}
							<EmojiEventsOutlinedIcon />
							<RedoIcon />
							<BookmarkBorderOutlinedIcon/>
						</Box>
					</Box>
				</Box>
			</Box>
		</Card>
	);
}

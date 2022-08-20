import * as React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Avatar, Box, Button, CardMedia, Link, styled } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { IPost } from "../api/interfaces/IPost";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { useContext, useState } from "react";
import { downvotePost, unvotePost, upvotePost } from "../api/postService";
import { getUserProfile } from "../api/authService";
import { ModalContext, UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import { calculateTimePassed, isUserAlreadyJoinedSubreddit } from "../utils/utility";
import { joinSubreddit } from "../api/subredditService";

const StyledActionBox = styled(Box)({
	borderRadius: "5px",
	padding: "5px",
	display: "flex",
	flexDirection: "row",
	gap: "3px",
	className: "box-hover",
});

type PostCardProps = {
	post: IPost;
};

export const PostCard = (props: PostCardProps) => {
	const userContext = useContext(UserContext);
	const modalContext = useContext(ModalContext);
	const navigate = useNavigate();

	const [upvoted, setUpvoted] = useState<boolean>(props.post.upvotedByUser);
	const [downvoted, setDownvoted] = useState<boolean>(
		props.post.downvotedByUser
	);

	const handleUpvote = (postId: number) => {
		if (!userContext.user) {
			modalContext.setShowLoginRegisterModal("register");
			return;
		}
		if (upvoted) {
			unvotePost(postId).then(() => setUpvoted(false));
		} else {
			upvotePost(postId).then(() => {
				props.post.votes++;
				setDownvoted(false);
				setUpvoted(true);
			});
		}
	};
	const handleDownvote = (postId: number) => {
		if (!userContext.user) {
			modalContext.setShowLoginRegisterModal("register");
			return;
		}

		if (downvoted) {
			unvotePost(postId).then(() => setDownvoted(false));
		} else {
			downvotePost(postId).then(() => {
				props.post.votes--;
				setDownvoted(true);
				setUpvoted(false);
			});
		}
	};

	const handleAward = () => {
		if (!userContext.user) {
			modalContext.setShowLoginRegisterModal("register");
			return;
		}
		//TODO: award functionality for logged in user
	};

	const handleSave = () => {
		if (!userContext.user) {
			modalContext.setShowLoginRegisterModal("register");
			return;
		}
		//TODO: save functionality for logged in user
	};

	const handleShare = () => {
		//TODO: share functionality
	};

	//future functionality
	const displayAwards = () => {
		return null;
	};

	const handleJoin = () => {
		if (!userContext.user) {
			modalContext.setShowLoginRegisterModal("register");
			return;
		}

		joinSubreddit(props.post.subreddit.id).then(() => {
			getUserProfile().then(user => userContext.setUser(user))
		})
	};

	const openPost = () => {
		navigate(`/comments/${props.post.id}`)
	}

	return (
		<Card sx={{ maxWidth: "lg", padding: "0 0" }}>
			<Box>
				<Box display="flex" flexDirection="row" gap="0px">
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
							<ThumbUpIcon
								fontSize="medium"
								onClick={() => handleUpvote(props.post.id)}
								sx={(theme) => ({
									fill: upvoted
										? theme.palette.info.main
										: null,
								})}
							/>
							<Typography variant="body2" color="text.secondary">
								{props.post.votes}
							</Typography>
							<ThumbDownIcon
								fontSize="medium"
								onClick={() => handleDownvote(props.post.id)}
								sx={(theme) => ({
									fill: downvoted
										? theme.palette.info.main
										: null,
								})}
							/>
						</Box>
					</Box>
					<Box className="content" marginBottom="5px" width="100%">
						<Box
							className="general-post-info"
							display="flex"
							flexDirection="column"
							marginLeft="5px"
							marginTop="7px"
						>
							<Box
								display="flex"
								justifyContent="space-between"
								margin="0 0"
								position="relative"
								alignItems="center"
							>
								<Box
									display="flex"
									flexDirection="row"
									alignItems="center"
								>
									<Avatar
										alt={props.post.subreddit.name}
										src={props.post.subreddit.mainImage || ""}
										variant="circular"
										sx={{
											width: 24,
											height: 24,
											marginRight: "5px",
										}}
									/>
									<Typography
										variant="body2"
										color="text.secondary"
									>
										{`r/${props.post.subreddit.name
											} - Posted by u/${props.post.author.username
											} ${calculateTimePassed(props.post.createdOn)} ${displayAwards() || ""
											}`}
									</Typography>
								</Box>{isUserAlreadyJoinedSubreddit(userContext.user, props.post.subreddit) ? null :
									<Button
										variant="contained"
										color="info"
										size="small"
										sx={{
											right: 0,
											position: "relative",
											borderRadius: "25px",
											height: "25px",
											marginRight: "5px",
											width: "15px",
											boxShadow: 0,
										}}
										onClick={handleJoin}
									>
										Join
									</Button>}
							</Box>
							<Typography onClick={openPost}
								gutterBottom
								variant="h5"
								component="div"
							>
								{props.post.title}
							</Typography>
						</Box>
						<Box className="post-content" marginBottom="10px" onClick={openPost}>
							{props.post.type === "text" ? (
								<Box
									className="text-post-content"
									marginLeft="5px"
								>
									<Typography
										variant="body2"
										color="text.secondary"
									>
										{props.post.content}
									</Typography>
								</Box>
							) : null}
							{props.post.type === "image" ? (
								<Box margin="0 3px">
									<Box
										className="image-post-content"
										width="100%"
										display="flex"
										justifyContent="center"
										margin="0 auto"
									>
										<CardMedia
											component="img"
											image={`${props.post.content}`}
											alt={`${props.post.title}`}
											height="100%"
											sx={{
												maxWidth: "100%",
												maxHeight: "512px",
												objectFit: "contain",
											}}
										/>
									</Box>
								</Box>
							) : null}
							{props.post.type === "link" ? (
								<Box
									className="image-post-content"
									marginLeft="5px"
								>
									{/* TODO: Add Link Preview */}
									<Link
										href={`${props.post.content}`}
										target="_blank"
										sx={(theme) => ({
											color: theme.palette.info.main,
										})}
									>
										{props.post.content}
									</Link>
								</Box>
							) : null}
						</Box>
						<Box
							className="post-actions"
							display="flex"
							flexDirection="row"
							gap="20px"
						>
							<StyledActionBox
								onClick={() =>
									navigate(`/comments/${props.post.id}`)
								}
							>
								<ChatBubbleOutlineOutlinedIcon />
								<Typography
									variant="body2"
									color="text.secondary"
								>
									{props.post.commentsCount + " Comments"}
								</Typography>
							</StyledActionBox>
							<StyledActionBox onClick={handleAward}>
								<EmojiEventsOutlinedIcon />
								<Typography
									variant="body2"
									color="text.secondary"
								>
									{" Award"}
								</Typography>
							</StyledActionBox>
							<StyledActionBox onClick={handleShare}>
								<ShareOutlinedIcon />
								<Typography
									variant="body2"
									color="text.secondary"
								>
									{" Share"}
								</Typography>
							</StyledActionBox>
							<StyledActionBox onClick={handleSave}>
								<BookmarkBorderOutlinedIcon />
								<Typography
									variant="body2"
									color="text.secondary"
								>
									{" Save"}
								</Typography>
							</StyledActionBox>
						</Box>
					</Box>
				</Box>
			</Box>
		</Card>
	);
};

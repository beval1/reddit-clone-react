import { Alert, Box, Button, InputBase, TextField } from "@mui/material";
import React, { useState } from "react";
import { ISubreddit } from "../../api/interfaces/ISubreddit";
import { createPost } from "../../api/postService";
import { ICreatePost } from "../../api/interfaces/ICreatePost";
import { handleInputChange } from "../../utils/utility";

type TextPostProps = {
	subreddit: ISubreddit | null;
};

const TextPost = (props: TextPostProps) => {
	type TextPostFormProps = {
		title: string;
		content: string;
	};
	const [textPostForm, setTextPostForm] = useState<TextPostFormProps>(
		{} as TextPostFormProps
	);
	const [error, setError] = useState("");

	const handlePost = () => {
		const post: ICreatePost = {
			title: textPostForm.title,
			comment: { content: textPostForm.content },
		};
		console.log(post);
		createPost(props.subreddit?.id, post, "text").catch((error: Error) => setError(error.message));
	};

	return (
		<Box
			display="flex"
			flexDirection="column"
			gap="10px"
			position="relative"
		>
			{error ? (
					<Box marginBottom="10px">
						<Alert severity="error">{error}</Alert>
					</Box>
				) : null}
			<Box
				sx={{
					border: "1px solid black",
					padding: "5px",
					borderRadius: "5px",
				}}
				width="100%"
			>
				<InputBase
					fullWidth
					size="medium"
					placeholder="Title"
					sx={{
						marginLeft: "10px",
					}}
					name="title"
					onChange={(e) => handleInputChange(e, setTextPostForm)}
				/>
			</Box>
			<Box>
				<TextField
					multiline
					placeholder="Text"
					fullWidth
					rows={6}
					variant="outlined"
					sx={{
						// marginLeft: "10px",
						border: "1px solid black",
						padding: "5px",
						borderRadius: "5px",
					}}
					name="content"
					onChange={(e) => handleInputChange(e, setTextPostForm)}
				/>
			</Box>
			<Box position="relative" width="100%">
				{/* TODO: Move to the fucking right side LOL */}
				<Box width="100%" position="relative" left="0">
					<Button
						color="info"
						variant="contained"
						onClick={handlePost}
					>
						Post
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default TextPost;

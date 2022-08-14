import { Alert, Box, Button, InputBase, TextField } from "@mui/material";
import React, { useState } from "react";
import { ISubreddit } from "../../api/interfaces/ISubreddit";
import { createPost } from "../../api/postService";
import { ICreatePost } from "../../api/interfaces/ICreatePost";
import { handleInputChange } from "../../utils/utility";

type LinkPostProps = {
	subreddit: ISubreddit | null;
};

const LinkPost = (props: LinkPostProps) => {
	type LinkPostFormProps = {
		title: string;
		link: string;
	};
	const [linkPostForm, setLinkPostForm] = useState<LinkPostFormProps>(
		{} as LinkPostFormProps
	);
	const [error, setError] = useState("");

	const handlePost = () => {
		const post: ICreatePost = {
			title: linkPostForm.title,
			link: linkPostForm.link
		};
        console.log(post)
		createPost(props.subreddit?.id, post, "link").catch((error: Error) => setError(error.message));
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
					onChange={(e) => handleInputChange(e, setLinkPostForm)}
				/>
			</Box>
            <Box
                sx={{
                    border: "1px solid black",
                    padding: "5px",
                    borderRadius: "5px",
                }}
                width="100%">
                <InputBase
                    fullWidth
                    size="medium"
                    placeholder="Link"
                    sx={{
                        marginLeft: "10px",
                    }}
                    name="link"
                    onChange={(e) => handleInputChange(e, setLinkPostForm)}
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

export default LinkPost;

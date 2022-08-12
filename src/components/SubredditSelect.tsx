import { Autocomplete, Box, TextField } from "@mui/material";
import { ISubreddit } from "../api/interfaces/ISubreddit";
import React from "react";

type SubredditSelectProps = {
	width?: string,
	size?: "small" | "medium"
}

export default function SubredditSelect(props: SubredditSelectProps) {
	return (
		<Autocomplete
			size={props.size || "small"}
			id="subreddit-select"
			sx={{ width: props.width || "200px" }}
			options={subreddits}
			autoHighlight
			getOptionLabel={(subreddit) => subreddit.name}
			renderOption={(props, subreddit) => (
				<Box
					component="li"
					sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
					{...props}
				>
					<img
						loading="lazy"
						width="20"
						src={subreddit.image || ""}
						// srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
						alt=""
					/>
					{subreddit.name}
				</Box>
			)}
			renderInput={(params) => (
				<TextField
					{...params}
					label="Choose a subreddit"
					inputProps={{
						...params.inputProps,
						autoComplete: "new-password", // disable autocomplete and autofill
					}}
				/>
			)}
		/>
	);
}

const subreddits: readonly ISubreddit[] = [
    { name: "AskReddit", description: 'Ask everything', image: '' },
    { name: "Fitness", description: 'Ask everything', image: '' },
];

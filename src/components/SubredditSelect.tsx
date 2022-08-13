import { Autocomplete, Box, SxProps, TextField, Theme } from "@mui/material";
import { ISubreddit } from "../api/interfaces/ISubreddit";
import React from "react";

type SubredditSelectProps = {
	size?: "small" | "medium"
	sx?: SxProps<Theme> | undefined
}

export const SubredditSelect = (props: SubredditSelectProps) => {
	return (
		<Autocomplete
			size={props.size || "small"}
			id="subreddit-select"
			sx={{
				...props.sx,
				"& .MuiAutocomplete-groupLabel:focused": {
					display: "none",
				},
			}}
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

export default SubredditSelect
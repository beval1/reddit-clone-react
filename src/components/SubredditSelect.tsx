import { Autocomplete, Box, SxProps, TextField, Theme } from "@mui/material";
import React from "react";
import { ISubreddit } from "../api/interfaces/ISubreddit";
import { IUser } from "../api/interfaces/IUser";

type SubredditSelectProps = {
	size?: "small" | "medium",
	sx?: SxProps<Theme> | undefined,
	setSelectedSubreddit: React.Dispatch<
		React.SetStateAction<ISubreddit | null>
	>,
	user: IUser,
};

export const SubredditSelect = (props: SubredditSelectProps) => {
	return (
		<Autocomplete
			onChange={(event: any, newValue: ISubreddit | null) => {
				props.setSelectedSubreddit(newValue);
			}}
			size={props.size || "small"}
			id="subreddit-select"
			sx={{
				...props.sx,
				"& .MuiAutocomplete-groupLabel:focused": {
					display: "none",
				},
			}}
			options={props.user.subreddits}
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
};

export default SubredditSelect;

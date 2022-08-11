import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: "#F6F7F8", //alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
		border: "1px solid #347deb",
	},
	border: "1px solid #DAE0E6",
	marginRight: theme.spacing(2),
	marginLeft: theme.spacing(2),
	width: "100%",	
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(3),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "35vw",
		},
	},
}));

const SearchBar = () => {
	return (
		<Search>
			<SearchIconWrapper>
				<SearchIcon style={{ fill: "grey" }}></SearchIcon>
			</SearchIconWrapper>
			<StyledInputBase
				placeholder="Search…"
				inputProps={{ "aria-label": "search" }}
			/>
		</Search>
	);
};

export default SearchBar;

import {
	alpha,
	AppBar,
	Box,
	Button,
	styled,
	Toolbar,
	Typography,
	useTheme,
} from "@mui/material";
import React from "react";
import RedditIcon from "@mui/icons-material/Reddit";
import SearchBar from "../../components/search-bar/SearchBar";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { fontSize } from "@mui/system";

const StyledToolbar = styled(Toolbar)({
	display: "flex",
	padding: "0 0",
	margin: "0 0",
	justifyContent: "space-between",
});

const StyledIconWrapper = styled("div")(({ theme }) => ({
	borderRadius: "20px",
	// border: "2px solid black",
	width: "40px",
	Height: "40px",
	backgroundColor: theme.palette.secondary.main,
}));

const StyledButton = styled(Button)(({ theme }) => ({
	borderRadius: "20px",
	width: "150px",
	fontWeight: "bold",
}));

const Navbar = () => {
	// const theme = useTheme();
	return (
		<AppBar position="static" elevation={0}>
			<StyledToolbar variant="dense">
				<Box display="flex">
					<StyledIconWrapper>
						<RedditIcon
							color="primary"
							fontSize="large"
							sx={{
								marginLeft: "2px",
							}}
						></RedditIcon>
					</StyledIconWrapper>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "cursive",
							fontWeight: 700,
							color: "inherit",
							textDecoration: "none",
							marginLeft: "10px",
							marginTop: "3px",
						}}
					>
						RedditClone
					</Typography>
				</Box>
				<SearchBar></SearchBar>
				<Box display="flex">
					<StyledButton variant="outlined" color="info">
						Log In
					</StyledButton>
					<StyledButton
						disableElevation
						variant="contained"
						color="info"
						sx={{
							marginLeft: "15px",
						}}
					>
						Sign Up
					</StyledButton>

					<Box display="flex">
						<PersonOutlineIcon
							fontSize="large"
							sx={{
								fill: "grey",
								marginLeft: "20px",
							}}
						></PersonOutlineIcon>
						<KeyboardArrowDownIcon
							sx={{
								marginTop: "5px",
								fill: "grey",
							}}
							fontSize="medium"
						></KeyboardArrowDownIcon>
					</Box>
				</Box>
			</StyledToolbar>
		</AppBar>
	);
};

export default Navbar;

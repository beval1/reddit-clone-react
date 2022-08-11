import {
	AppBar,
	Box,
	Button,
	styled,
	Toolbar,
	Typography,
} from "@mui/material";
import React, { useState } from "react";
import RedditIcon from "@mui/icons-material/Reddit";
import SearchBar from "../../components/SearchBar";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LoginPage from "../../pages/log-in/LoginPage";
import { useNavigate } from "react-router-dom";
import LoginRegisterModal from "../../components/LoginRegisterModal";

const StyledToolbar = styled(Toolbar)({
	display: "flex",
	padding: "0 0",
	margin: "0 0",
	justifyContent: "space-between",
});

const StyledIconWrapper = styled("div")(({ theme }) => ({
	borderRadius: "20px",
	width: "40px",
	Height: "40px",
	backgroundColor: theme.palette.secondary.main,
}));

const StyledButton = styled(Button)(({ theme }) => ({
	borderRadius: "20px",
	width: "10vw",
	[theme.breakpoints.down("md")]: {
		width: "20vw",
	},
	[theme.breakpoints.down("sm")]: {
		display: "none",
	},
	fontWeight: "bold",
}));

const Navbar = () => {
	const [showLoginRegisterModal, setShowLoginRegisterModal] = useState<"login" | "register" | null | undefined>(null);
	let navigate = useNavigate();
	function navigateToHome() {
		navigate("/");
	}

	return (
		<AppBar position="static" elevation={1}>
			<LoginRegisterModal
				modal={showLoginRegisterModal}
				setModal={(state: "login" | "register" | null | undefined) =>
					setShowLoginRegisterModal(state)
				}
			/>
			<StyledToolbar variant="dense">
				<Box display="flex" onClick={navigateToHome}>
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
					<StyledButton
						variant="outlined"
						color="info"
						onClick={() => setShowLoginRegisterModal("login")}
					>
						Log In
					</StyledButton>
					<StyledButton
						disableElevation
						variant="contained"
						color="info"
						sx={{
							marginLeft: "15px",
						}}
						onClick={() => setShowLoginRegisterModal("register")}
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

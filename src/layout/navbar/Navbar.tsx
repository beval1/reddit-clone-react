import {
	AppBar,
	Avatar,
	Box,
	Button,
	styled,
	Toolbar,
	Typography,
	useTheme,
} from "@mui/material";
import React, { useState } from "react";
import RedditIcon from "@mui/icons-material/Reddit";
import SearchBar from "../../components/SearchBar";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import LoginRegisterModal from "../../components/LoginRegisterModal";
import { getAuthenticatedUser } from "../../api/authService";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import { GreenDotBadge } from "../../components/GreenDotBadge";
import { IUser } from "../../api/interfaces/IUser";
import SubredditSelect from "../../components/SubredditSelect";

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
	const [showLoginRegisterModal, setShowLoginRegisterModal] = useState<
		"login" | "register" | null | undefined
	>(null);
	const navigate = useNavigate();
	const navigateToHome = () => {
		navigate("/");
	};
	const user: IUser | null = getAuthenticatedUser();
	const theme = useTheme();

	return (
		<AppBar position="static" elevation={1}>
			<LoginRegisterModal
				modal={showLoginRegisterModal}
				setModal={(state: "login" | "register" | null | undefined) =>
					setShowLoginRegisterModal(state)
				}
			/>
			<StyledToolbar variant="dense">
				<Box
					display="flex"
					onClick={navigateToHome}
					sx={{
						[theme.breakpoints.down("lg")]: {
							marginRight: "10px",
						},
					}}
				>
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
							[theme.breakpoints.down("lg")]: {
								display: "none",
							},
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
				{user ? <SubredditSelect /> : null}
				<SearchBar></SearchBar>
				{user ? (
					<Box
						display="flex"
						sx={{
							gap: "15px",
							[theme.breakpoints.down("lg")]: {
								gap: "5px",
							},
						}}
					>
						<TextsmsOutlinedIcon
							fontSize="large"
							sx={{
								padding: "2px 5px",
								borderRadius: "5px",
								"&:hover": {
									backgroundColor: "#E8E8E8",
								},
							}}
						></TextsmsOutlinedIcon>
						<NotificationsNoneOutlinedIcon
							fontSize="large"
							sx={{
								padding: "2px 5px",
								borderRadius: "5px",
								"&:hover": {
									backgroundColor: "#E8E8E8",
								},
							}}
						></NotificationsNoneOutlinedIcon>
						<AddIcon
							fontSize="large"
							sx={{
								padding: "2px 5px",
								borderRadius: "5px",
								"&:hover": {
									backgroundColor: "#E8E8E8",
								},
							}}
						></AddIcon>
						<Box
							className="profile-box"
							display="flex"
							gap="10px"
							marginLeft="5px"
							sx={{
								padding: "2px 5px",
								borderRadius: "5px",
								"&:hover": {
									border: "1px solid black",
								},
							}}
						>
							<Box
								className="avatar-box"
								position="relative"
								top="2px"
							>
								<GreenDotBadge
									overlap="circular"
									anchorOrigin={{
										vertical: "bottom",
										horizontal: "right",
									}}
									variant="dot"
								>
									<Avatar
										alt={user.username}
										src={user.profileImage || ""}
										variant="square"
										sx={{ width: 34, height: 34 }}
									/>
								</GreenDotBadge>
							</Box>
							<Box
								sx={{
									position: "relative",
									[theme.breakpoints.down("md")]: {
										display: "none",
									},
								}}
							>
								<Typography
									component="p"
									fontSize="small"
									fontWeight="bold"
									sx={{ position: "relative", top: "0" }}
								>
									{user.username}
								</Typography>
								<Typography
									component="p"
									fontSize="small"
									sx={{ position: "relative", bottom: "0" }}
									color="grey"
									noWrap
								>
									{user.totalKarma || "0 karma"}
								</Typography>
							</Box>
							<KeyboardArrowDownIcon
								sx={{
									marginTop: "7px",
									marginLeft: "70px",
									fill: "grey",
									[theme.breakpoints.down("lg")]: {
										marginLeft: "0px",
									},
								}}
								fontSize="medium"
							></KeyboardArrowDownIcon>
						</Box>
					</Box>
				) : (
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
							onClick={() =>
								setShowLoginRegisterModal("register")
							}
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
				)}
			</StyledToolbar>
		</AppBar>
	);
};

export default Navbar;

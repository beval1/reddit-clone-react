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
import React, { useContext, useState } from "react";
import RedditIcon from "@mui/icons-material/Reddit";
import SearchBar from "../../components/SearchBar";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import LoginRegisterModal from "../../components/LoginRegisterModal";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import { GreenDotBadge } from "../../components/GreenDotBadge";
import SubredditSelect from "../../components/SubredditSelect";
import { ModalContext, UserContext } from "../../App";
import { ISubreddit } from "../../api/interfaces/ISubreddit";
import ProfileMenu from "../../components/ProfileMenu";

const StyledToolbar = styled(Toolbar)({
	display: "flex",
	padding: "0 0",
	margin: "0 0",
	justifyContent: "space-between",
});

const StyledIconWrapper = styled("div")(({ theme }) => ({
	borderRadius: "22px",
	width: "44px",
	Height: "44px",
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
	const modal = useContext(ModalContext);
	const navigate = useNavigate();
	const navigateToHome = () => {
		navigate("/");
	};
	const userContext = useContext(UserContext);
	const user = userContext.user
	const theme = useTheme();
	const [selectedSubreddit, setSelectedSubreddit] = useState<ISubreddit | null>(null);
	const [profileDropdown, setProfileDropdown] = React.useState<null | HTMLElement>(null);


	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setProfileDropdown(event.currentTarget);
	};

	return (
		<AppBar position="fixed" elevation={1}>
			<LoginRegisterModal
				modal={modal.showLoginRegisterModal}
				setModal={(state: "login" | "register" | null | undefined) =>
					modal.setShowLoginRegisterModal(state)
				}
			/>
			<ProfileMenu profileDropdown={profileDropdown} setProfileDropdown={setProfileDropdown}></ProfileMenu>
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
								marginLeft: "4px",
								marginTop: "3px",
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
							marginTop: "6px",
						}}
					>
						RedditClone
					</Typography>
				</Box>
				{user ? <SubredditSelect sx={{ width: "200px" }} user={user} setSelectedSubreddit={setSelectedSubreddit} /> : null}
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
						alignItems="center"
					>
						<TextsmsOutlinedIcon
							fontSize="large"
							sx={{
								padding: "2px 5px",
								borderRadius: "5px",
							}}
							className="box-hover"
						></TextsmsOutlinedIcon>
						<NotificationsNoneOutlinedIcon
							fontSize="large"
							sx={{
								padding: "2px 5px",
								borderRadius: "5px",
							}}
							className="box-hover"
						></NotificationsNoneOutlinedIcon>
						<AddIcon
							fontSize="large"
							sx={{
								padding: "2px 5px",
								borderRadius: "5px",
							}}
							className="box-hover"
							onClick={() => navigate("/create-post/text")}
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
							onClick={e => handleOpenUserMenu(e)}
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
							onClick={() => modal.setShowLoginRegisterModal("login")}
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
								modal.setShowLoginRegisterModal("register")
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

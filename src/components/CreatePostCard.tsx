import {
	Box,
	Card,
	CardContent,
	Typography,
	Divider,
	CardActions,
	Button,
	Avatar,
	InputBase,
} from "@mui/material";
import React from "react";
import { IUser } from "../api/interfaces/IUser";
import { GreenDotBadge } from "./GreenDotBadge";
import { RedditTextField } from "./RedditTextField";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import { alpha } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom'

type Props = {
	user: IUser;
};

export const CreatePostCard = (props: Props) => {
	const navigate = useNavigate();

	return (
		<Card
			sx={{
				padding: "10px 0",
			}}
		>
			<Box display="flex" alignItems="center" margin="0 10px">
				<Box>
					<GreenDotBadge
						overlap="circular"
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "right",
						}}
						variant="dot"
					>
						<Avatar
							alt={props.user.username}
							src={props.user.profileImage || ""}
							variant="circular"
							sx={{ width: 40, height: 40 }}
						/>
					</GreenDotBadge>
				</Box>
				<Box
					width="100%"
					display="flex"
					alignItems="center"
					gap="10px"
					marginLeft="10px"
				>
					<InputBase
						sx={(theme) => ({
							// position: "relative",
							borderRadius: 1,
							backgroundColor: "#F6F7F8", //alpha(theme.palette.common.white, 0.15),
							"&:hover": {
								backgroundColor: alpha(
									theme.palette.common.white,
									0.25
								),
								border: "1px solid #347deb",
							},
							border: "1px solid #DAE0E6",
							width: "100%",
							padding: "5px 5px",
						})}
						size="medium"
						placeholder="Create Post"
						onClick={() => navigate("/create-post")}
					></InputBase>
					<ImageOutlinedIcon
						fontSize="large"
						className="box-hover"
						onClick={() => navigate("/create-post/image")}
					></ImageOutlinedIcon>
					<LinkOutlinedIcon
						fontSize="large"
						className="box-hover"
						onClick={() => navigate("/create-post/link")}
					></LinkOutlinedIcon>
				</Box>
			</Box>
		</Card>
	);
};

export default CreatePostCard;

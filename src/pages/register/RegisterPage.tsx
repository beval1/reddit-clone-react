import { Box, Button, Divider, FormGroup, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { Link, To, useNavigate } from "react-router-dom";
import { RedditTextField } from "../../components/RedditTextField";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import LoginRegisterProviderButton from "../../components/LoginRegisterProviderButton";
import StyledLink from "../../components/StyledLink";

type RegisterPageProps = {
	modalManagement: (
		path: To | undefined | null,
		modal: "login" | "register" | undefined | null
	) => void;
};

export default function RegisterPage(props: RegisterPageProps) {
	return (
		<Box
			sx={{
				width: "50%",
				marginLeft: "auto",
				marginRight: "auto",
				position: "relative",
				top: "5%",
			}}
		>
			<LoginRegisterProviderButton
				variant="outlined"
				size="large"
				startIcon={<AppleIcon />}
			>
				Continue with Apple
			</LoginRegisterProviderButton>
			<LoginRegisterProviderButton
				variant="outlined"
				size="large"
				startIcon={<GoogleIcon />}
			>
				Continue with Google
			</LoginRegisterProviderButton>
			<Divider
				light
				sx={{
					marginBottom: "10px",
					marginTop: "5px",
					color: "#878a8c",
				}}
			>
				OR
			</Divider>
			<Box
				component="form"
				sx={{
					"& .MuiTextField-root": {
						marginBottom: 2,
						width: "100%",
					},
				}}
				noValidate
				autoComplete="off"
			>
				<FormGroup>
					<RedditTextField
						label="Username"
						id="username-input"
						variant="filled"
						size="small"
					/>
					<RedditTextField
						label="Email"
						id="email-input"
						variant="filled"
						size="small"
					/>
					<RedditTextField
						label="Password"
						id="pass-input"
						variant="filled"
						size="small"
						type="password"
					/>
					<RedditTextField
						label="Confirm-Password"
						id="confirm-pass-input"
						variant="filled"
						size="small"
						type="password"
					/>
				</FormGroup>
				<Button
					variant="contained"
					size="large"
					color="info"
					sx={{
						borderRadius: 4,
						width: "100%",
					}}
				>
					Log In
				</Button>
			</Box>
			<Box marginTop="20px">
				<Typography component="p">
					Already a Redditor?{" "}
					<Typography component="a">
						<StyledLink
							to="#"
							onClick={() => props.modalManagement(null, "login")}
						>
							LOG IN
						</StyledLink>
					</Typography>
				</Typography>
			</Box>
		</Box>
	);
}

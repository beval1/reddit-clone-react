import { Box, Button, FormGroup, styled, Typography } from "@mui/material";
import React, { useState } from "react";
import { RedditTextField } from "../../components/RedditTextField";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import { Link, To, useNavigate } from "react-router-dom";
import StyledLink from "../../components/StyledLink";
import LoginRegisterProviderButton from "../../components/LoginRegisterProviderButton";

type LoginPageProps = {
	modalManagement: (
		path: To | undefined | null,
		modal: "login" | "register" | undefined | null
	) => void;
};

export default function LoginPage(props: LoginPageProps) {
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
			{/* <StyledButton
							variant="outlined"
							size="large"
							startIcon={<EmailIcon />}
						>
							Continue with Email
						</StyledButton> */}
			<Box
				display="flex"
				alignItems="center"
				gap="10px"
				marginBottom="10px"
				marginTop="5px"
			>
				<span
					style={{
						borderTop: "1px solid #edeff1",
						width: "45%",
					}}
				></span>
				<span
					style={{
						marginLeft: 2,
						marginRight: 2,
						color: "#878a8c",
					}}
				>
					OR
				</span>
				<span
					style={{
						borderTop: "1px solid #edeff1",
						width: "45%",
					}}
				></span>
			</Box>
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
						label="Username or Email"
						id="user-input"
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
			<Box marginTop="10px">
				<Typography component="p" marginBottom="15px" fontSize="small">
					Forgot your
					<Typography component="a" fontSize="small">
						<StyledLink to="/"> username </StyledLink>
					</Typography>
					or
					<Typography component="a" fontSize="small">
						<StyledLink to="/"> password </StyledLink>
					</Typography>
					?
				</Typography>
				<Typography component="p">
					New to Reddit?{" "}
					<Typography component="a">
						<StyledLink
							to="#"
							onClick={() => props.modalManagement(null, "register")}
						>
							SIGN UP
						</StyledLink>
					</Typography>
				</Typography>
			</Box>
		</Box>
	);
}

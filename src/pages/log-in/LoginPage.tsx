import { Alert, Box, Button, Divider, FormGroup, Typography } from "@mui/material";
import React, { useState } from "react";
import { RedditTextField } from "../../components/RedditTextField";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import { To } from "react-router-dom";
import StyledLink from "../../components/StyledLink";
import LoginRegisterProviderButton from "../../components/LoginRegisterProviderButton";
import { logIn } from "../../api/authService";
import { handleInputChange } from "../../utils/utility";

type LoginPageProps = {
	modalManagement: (
		path: To | undefined | null,
		modal: "login" | "register" | undefined | null
	) => void;
};

export default function LoginPage(props: LoginPageProps) {
	type formProps = {
		usernameOrEmail: string;
		password: string;
	};

	const [form, setForm] = useState<formProps>({} as formProps);
	const [error, setError] = useState<string>("");

	const handleLogin = () => {
		logIn(form.usernameOrEmail, form.password)
			.then(() => props.modalManagement(null, null))
			.catch((e: Error) => {
				setError(e.message);
			});
	};

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
				{error ? (
					<Box marginBottom="10px">
						<Alert severity="error">{error}</Alert>
					</Box>
				) : null}
				<FormGroup>
					<RedditTextField
						label="Username or Email"
						id="usernamePrEmail"
						name="usernameOrEmail"
						variant="filled"
						size="small"
						onChange={(e) => handleInputChange(e, setForm)}
					/>
					<RedditTextField
						name="password"
						label="Password"
						id="password"
						variant="filled"
						size="small"
						type="password"
						onChange={(e) => handleInputChange(e, setForm)}
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
					onClick={handleLogin}
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
							onClick={() =>
								props.modalManagement(null, "register")
							}
						>
							SIGN UP
						</StyledLink>
					</Typography>
				</Typography>
			</Box>
		</Box>
	);
}

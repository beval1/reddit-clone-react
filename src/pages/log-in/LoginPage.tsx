import { Alert, Box, Button, Divider, FormGroup, Typography } from "@mui/material";
import React, { useState, useContext } from "react";
import { RedditTextField } from "../../components/RedditTextField";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import { To } from "react-router-dom";
import StyledLink from "../../components/StyledLink";
import LoginRegisterProviderButton from "../../components/LoginRegisterProviderButton";
import { logIn } from "../../api/authService";
import { handleInputChange } from "../../utils/utility";
import { UserContext } from "../../App";

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

	const userContext = useContext(UserContext);
	const [form, setForm] = useState<formProps>({} as formProps);
	const [error, setError] = useState<string>("");

	const handleLogin = () => {
		logIn(form.usernameOrEmail, form.password)
			.then((user) => {
				userContext.setUser(user)
				props.modalManagement(null, null)
			})
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
						onChange={(e: any) => handleInputChange(e, setForm)}
					/>
					<RedditTextField
						name="password"
						label="Password"
						id="password"
						variant="filled"
						size="small"
						type="password"
						onChange={(e: any) => handleInputChange(e, setForm)}
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
				<Box marginBottom="15px" fontSize="small" display="flex" gap="5px">
					Forgot your
					<Typography component="p" fontSize="small" display="flex">
						<StyledLink to="/"> username </StyledLink>
					</Typography>
					or
					<Typography component="p" fontSize="small" display="flex">
						<StyledLink to="/"> password </StyledLink>
					</Typography>
					?
				</Box>
				<Box display="flex" gap="5px">
					New to Reddit?
					<Typography component="p" display="flex">
						<StyledLink
							to="#"
							onClick={() =>
								props.modalManagement(null, "register")
							}
						>
							SIGN UP
						</StyledLink>
					</Typography>
				</Box>
			</Box>
		</Box>
	);
}

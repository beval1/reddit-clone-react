import { Alert, Box, Button, Divider, FormGroup, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { Link, To, useNavigate } from "react-router-dom";
import { RedditTextField } from "../../components/RedditTextField";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import LoginRegisterProviderButton from "../../components/LoginRegisterProviderButton";
import StyledLink from "../../components/StyledLink";
import { handleInputChange } from "../../utils/utility";
import { registerUser } from "../../api/authService";

type RegisterPageProps = {
	modalManagement: (
		path: To | undefined | null,
		modal: "login" | "register" | undefined | null
	) => void;
};

export default function RegisterPage(props: RegisterPageProps) {
	type FormProps = {
		username: string,
		email: string,
		password: string,
		confirmPassword: string,
	}
	const [form, setForm] = useState<FormProps>({} as FormProps)

	type FormValidation = {
		username: boolean,
		email: boolean,
		password: boolean,
		confirmPassword: boolean,
	}
	const [formValidations, setFormValidations] = useState<FormValidation>({
		username: true,
		email: true,
		password: true,
		confirmPassword: true
	});
	const [result, setResult] = useState<string | null>(null)
	const [registerClicked, setRegisterClicked] = useState<boolean>(false)

	const handleRegister = () => {
		console.log(form)
		Object.keys(formValidations).forEach(key => setFormValidations((prev) => ({
			...prev,
			[key]: true
		})))
		setResult(null);

		const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
		if (!form.email || !form.email.match(emailRegex)) {
			setFormValidations((prev) => ({
				...prev,
				email: false
			}));
		}
		if (!form.username || form.username.length < 5) {
			setFormValidations((prev) => ({
				...prev,
				username: false
			}));
		}
		if (!form.password) {
			setFormValidations((prev) => ({
				...prev,
				password: false
			}));
		}
		if (!form.confirmPassword || form.confirmPassword !== form.password) {
			setFormValidations((prev) => ({
				...prev,
				confirmPassword: false
			}));
		}

		setRegisterClicked(true);
	}

	useEffect(() => {
		if (registerClicked) {
			let validForm = true;
			console.log(formValidations)
			Object.values(formValidations).forEach(value => {
				if (value === false) {
					validForm = false;
					setRegisterClicked(false)
				}
			})

			if (validForm) {
				console.log("here")
				registerUser(form.username, form.email, form.password)
					.then(msg => setResult(msg))
					.catch(error => setResult(error.message))
			}
		}
	}, [formValidations])

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
						// marginBottom: 2,
						width: "100%",
					},
				}}
				noValidate
				autoComplete="off"
				display="flex"
				flexDirection="column"
				gap="16px"
			>
				{result ? <Box>
					<Alert severity="warning">{result}</Alert>
				</Box> : null}
				<FormGroup>
					<RedditTextField
						label="Username"
						id="username-input"
						variant="filled"
						size="small"
						name="username"
						onChange={((e: any) => handleInputChange(e, setForm))}
					/>
					<Box sx={{
						display: formValidations.username ? "none" : "block"
					}}>
						<Typography variant="body2" sx={{
							color: "red"
						}}>Invalid username</Typography>
					</Box>
				</FormGroup>
				<FormGroup>
					<RedditTextField
						label="Email"
						id="email-input"
						variant="filled"
						size="small"
						name="email"
					onChange={((e: any) => handleInputChange(e, setForm))}
					/>
					<Box sx={{
						display: formValidations.email ? "none" : "block",
						margin: "0 0",
						padding: "0 0"
					}}>
						<Typography variant="body2" sx={{
							color: "red",
						}}>Invalid email</Typography>
					</Box>
				</FormGroup>
				<FormGroup>
					<RedditTextField
						label="Password"
						id="pass-input"
						variant="filled"
						size="small"
						type="password"
						name="password"
						onChange={((e: any) => handleInputChange(e, setForm))}
					/>
					<Box sx={{
						display: formValidations.password ? "none" : "block"
					}}>
						<Typography variant="body2" sx={{
							color: "red"
						}}>Invalid password</Typography>
					</Box>
				</FormGroup>
				<FormGroup>
					<RedditTextField
						label="Confirm-Password"
						id="confirm-pass-input"
						variant="filled"
						size="small"
						type="password"
						name="confirmPassword"
						onChange={((e: any) => handleInputChange(e, setForm))}
					/>
					<Box sx={{
						display: formValidations.confirmPassword ? "none" : "block"
					}}>
						<Typography variant="body2" sx={{
							color: "red"
						}}>Password don't match</Typography>
					</Box>
				</FormGroup>
				<Button
					variant="contained"
					size="large"
					color="info"
					sx={{
						borderRadius: 4,
						width: "100%",
						// marginTop: "10px"
					}}
					onClick={handleRegister}
				>
					Register
				</Button>
			</Box>
			<Box margin="20px 0">
				<Typography component="p">
					Already a Redditor?{" "}
					<Typography component="p">
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

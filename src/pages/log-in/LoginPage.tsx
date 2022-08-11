import {
	Box,
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	FormGroup,
	IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { RedditTextField } from "../../components/RedditTextField";
import EmailIcon from "@mui/icons-material/Email";

export type DialogTitleProps = {
	id: string;
	children?: React.ReactNode;
	onClose: () => void;
};

const BootstrapDialogTitle = (props: DialogTitleProps) => {
	const { children, onClose, ...other } = props;

	return (
		<DialogTitle sx={{ m: 0, p: 2 }} {...other}>
			{children}
			{onClose ? (
				<IconButton
					aria-label="close"
					onClick={onClose}
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</DialogTitle>
	);
};

type LoginPageProps = {
	open: boolean;
	close: () => void;
};

export default function LoginPage(props: LoginPageProps) {
	return (
		<div>
			<Dialog
				onClose={props.close}
				aria-labelledby="customized-dialog-title"
				open={props.open}
				maxWidth="lg"
				PaperProps={{
					sx: {
						width: "50vw",
						height: "90vh",
					},
				}}
			>
				<BootstrapDialogTitle
					id="customized-dialog-title"
					onClose={props.close}
				>
					Log In
				</BootstrapDialogTitle>
				<DialogContent dividers>
					<Button
						variant="outlined"
						size="large"
						startIcon={<EmailIcon />}
						sx={{
							borderRadius: 4,
							borderColor: "#e2e2e1",
							marginBottom: 2,
							width: "50%",
							// fontWeight: "bold",
							color: "black",
							"&:hover": {
								borderColor: "#e2e2e1",
							},
						}}
					>
						Continue with Email
					</Button>
					<Box
						display="flex"
						alignItems="center"
						gap="10px"
						marginBottom="10px"
					>
						<span
							style={{
								borderTop: "1px solid #edeff1",
								width: "22%",
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
								width: "22%",
							}}
						></span>
					</Box>
					<Box
						component="form"
						sx={{
							"& .MuiTextField-root": {
								marginBottom: 2,
								width: "50%",
							},
						}}
						noValidate
						autoComplete="off"
					>
						<FormGroup>
							<RedditTextField
								label="Username"
								id="user-input"
								variant="filled"
								size="small"
							/>
							<RedditTextField
								label="Password"
								id="pass-input"
								variant="filled"
								size="small"
							/>
						</FormGroup>
						<Button
							variant="contained"
							size="large"
							color="info"
							sx={{
								borderRadius: 4,
								width: "50%",
							}}
						>
							Log In
						</Button>
					</Box>
				</DialogContent>
			</Dialog>
		</div>
	);
}

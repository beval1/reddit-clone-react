import {
	Box,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import RegisterPage from "../pages/register/RegisterPage";
import LoginPage from "../pages/log-in/LoginPage";
import { To, useNavigate } from "react-router-dom";

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

type ModalProps = {
	modal: "login" | "register" | null | undefined;
	setModal: (state: "login" | "register" | null | undefined) => void;
};

const LoginRegisterModal = (props: ModalProps) => {
	const modalManagement = (
		path: To | undefined | null,
		modal: "login" | "register" | undefined | null
	) => {
		props.setModal(modal)

		if (path) {
			let navigate = useNavigate();
			navigate(path);
		}
	};

	return (
		<Dialog
			onClose={() => modalManagement(null, null)}
			aria-labelledby="customized-dialog-title"
			open={props.modal != null && props.modal != undefined}
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
				onClose={() => modalManagement(null, null)}
			>
				{props.modal == "login" ? "Log In" : "Register"}
			</BootstrapDialogTitle>
			<DialogContent dividers>
				{props.modal == "login" ? (
					<LoginPage modalManagement={modalManagement} />
				) : (
					<RegisterPage modalManagement={modalManagement} />
				)}
			</DialogContent>
		</Dialog>
	);
};

export default LoginRegisterModal;

import {
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
} from "@mui/material";
import React from "react";
import RegisterPage from "../pages/register/RegisterPage";
import LoginPage from "../pages/log-in/LoginPage";
import { To, useNavigate } from "react-router-dom";
import { BootstrapDialogTitle } from "./BootstrapDialogTitle";

type ModalProps = {
	modal: "login" | "register" | null | undefined;
	setModal: (state: "login" | "register" | null | undefined) => void;
};

const LoginRegisterModal = (props: ModalProps) => {
	const navigate = useNavigate();

	const modalManagement = (
		path: To | undefined | null,
		modal: "login" | "register" | undefined | null
	) => {
		props.setModal(modal)

		if (path) {
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

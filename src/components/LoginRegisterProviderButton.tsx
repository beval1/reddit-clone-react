import { Button, styled } from "@mui/material";

const LoginRegisterProviderButton = styled(Button)(({ theme }) => ({
	borderRadius: "15px",
	borderColor: "#e2e2e1",
	marginBottom: "5px",
	width: "100%",
	color: "black",
	"&:hover": {
		borderColor: "#e2e2e1",
	},
}));

export default LoginRegisterProviderButton;

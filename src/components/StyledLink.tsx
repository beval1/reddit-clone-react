import { styled } from "@mui/material";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)(({ theme }) => ({
	textDecoration: "none",
	color: theme.palette.info.main,
}));

export default StyledLink
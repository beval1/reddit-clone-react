import React from "react";
import Header from "./layout/header/Header";
import Footer from "./layout/footer/Footer";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./layout/theme/theme";

function App() {
	const location = useLocation();

	return (
		<ThemeProvider theme={theme}>
			<Header></Header>
			{location.pathname === "/" ? (
				<Navigate to="/home" replace={true} />
			) : (
				<Outlet></Outlet>
			)}
			<Footer></Footer>
		</ThemeProvider>
	);
}

export default App;

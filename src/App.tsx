import React from "react";
import Header from "./layout/header/Header";
import Footer from "./layout/footer/Footer";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Box, Container, CssBaseline, StyledEngineProvider, ThemeProvider } from "@mui/material";
import theme from "./layout/theme/theme";
import "./App.css"

function App() {
	const location = useLocation();

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<StyledEngineProvider injectFirst>
				<Header></Header>
				{location.pathname === "/" ? (
					<Navigate to="/home" replace={true} />
				) : (
					<Container maxWidth="md">
						<Box sx={{ margin: "70px 0px" }}>
							<Outlet></Outlet>
						</Box>
					</Container>
				)}
				<Footer></Footer>
			</StyledEngineProvider>
		</ThemeProvider>
	);
}

export default App;

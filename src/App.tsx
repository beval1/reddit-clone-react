import React, { createContext, useState } from "react";
import Header from "./layout/header/Header";
import Footer from "./layout/footer/Footer";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Box, Container, CssBaseline, StyledEngineProvider, ThemeProvider } from "@mui/material";
import theme from "./layout/theme/theme";
import "./App.css"

type ModalContextType = {
	showLoginRegisterModal: "login" | "register" | null | undefined;
	setShowLoginRegisterModal: React.Dispatch<
		React.SetStateAction<"login" | "register" | null | undefined>
	>;
};
export const ModalContext = createContext<ModalContextType>({} as ModalContextType);

function App() {
	const location = useLocation();
	const [showLoginRegisterModal, setShowLoginRegisterModal] = useState<
		"login" | "register" | null | undefined
	>(null);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<StyledEngineProvider injectFirst>
				<ModalContext.Provider value={{ showLoginRegisterModal, setShowLoginRegisterModal }}>
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
				</ModalContext.Provider>
			</StyledEngineProvider>
		</ThemeProvider>
	);
}

export default App;

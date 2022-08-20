import React, { createContext, useState } from "react";
import Header from "./layout/header/Header";
import Footer from "./layout/footer/Footer";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Box, Container, CssBaseline, StyledEngineProvider, ThemeProvider } from "@mui/material";
import theme from "./layout/theme/theme";
import "./App.css"
import { IUser } from "./api/interfaces/IUser";

type ModalContextType = {
	showLoginRegisterModal: "login" | "register" | null | undefined;
	setShowLoginRegisterModal: React.Dispatch<
		React.SetStateAction<"login" | "register" | null | undefined>
	>;
};
export const ModalContext = createContext<ModalContextType>({} as ModalContextType);

type UserContextType = {
	user: IUser | null,
	setUser: React.Dispatch<
		React.SetStateAction<IUser | null>
	>;
};
export const UserContext = createContext<UserContextType>({} as UserContextType);

function App() {
	const location = useLocation();
	const [showLoginRegisterModal, setShowLoginRegisterModal] = useState<
		"login" | "register" | null | undefined
		>(null);
	const [user, setUser] = useState<IUser | null>(null);
	const localUser = localStorage.getItem('user')
	if (localUser && localStorage.getItem('accessToken') && !user) {
		setUser(JSON.parse(localUser));
	}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<StyledEngineProvider injectFirst>
				<UserContext.Provider value={{ user, setUser }}>
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
				</UserContext.Provider>
			</StyledEngineProvider>
		</ThemeProvider>
	);
}

export default App;

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/log-in/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import NotFoundPage from "./pages/not-found/NotFoundPage";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route path="/home" element={<HomePage />} />
					<Route path="/create-post" element={<HomePage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);

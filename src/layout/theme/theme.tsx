import { purple, blue, green, yellow, grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";


const theme = createTheme({
	palette: {
		primary: {
			main: "#FFFFFF",
		},
		secondary: {
			main: "#FF4500",
		},
		background: {
			default: "#DAE0E6",
		},
		// third: {
		// 	main: "#DAE0E6",
		// },
	},
	components: {
		MuiSvgIcon: {
			styleOverrides: {
				colorPrimary: "#DAE0E6",
			},
			defaultProps: {
				fill: "#DAE0E6",
			},
		},
		MuiIcon: {
			styleOverrides: {
				colorPrimary: "#DAE0E6",
			},
			defaultProps: {
				color: "primary",
			},
		},
	},
});

export default theme;

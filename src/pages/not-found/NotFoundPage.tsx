import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import GlobalStyles from "@mui/material/GlobalStyles";

function getRandomChar() {
    let r = Math.floor(Math.random() * 5);
    return String.fromCharCode(97 + r);
}

const inputGlobalStyles = (
	<GlobalStyles
		styles={{
			body: { backgroundColor: "white" },
		}}
	/>
);

const NotFoundPage = () => {
  return (
		<Grid
			container
			spacing={0}
			direction="column"
			alignItems="center"
			justifyContent="center"  
			style={{ minHeight: "100vh" }}
		>
			{inputGlobalStyles}
			<Box>
				<img src={process.env.PUBLIC_URL + "/img/not-found/reddit404" + getRandomChar() + ".png"} />;
			</Box>
			<Box>
				<Typography variant="h6" textAlign="center">
					page not found
				</Typography>
				<Typography component="p" textAlign="center">
					the page you requested does not exist
				</Typography>
			</Box>
		</Grid>
  );
};

export default NotFoundPage;

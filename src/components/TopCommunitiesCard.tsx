import {
	Card,
	CardContent,
	Typography,
	Divider,
	CardActions,
	Button,
} from "@mui/material";
import React from "react";

type Props = {};

const TopCommunitiesCard = (props: Props) => {
	return (
		<Card>
			{/* <CardMedia
								component="img"
								alt="green iguana"
								height="140"
								image="/static/images/cards/contemplative-reptile.jpg"
							/> */}
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					Top Communities
				</Typography>
				<Divider sx={{ marginBottom: "15px" }}></Divider>
				<Typography variant="body2" color="text.secondary">
					Lizards are a widespread group of squamate reptiles, with
					over 6,000 species, ranging across all continents except
					Antarctica
				</Typography>
			</CardContent>
			<CardActions>
				<Button
					size="medium"
					color="info"
					variant="contained"
					sx={{
						width: "100%",
						borderRadius: "20px",
						boxShadow: 0,
					}}
				>
					View All
				</Button>
			</CardActions>
		</Card>
	);
};

export default TopCommunitiesCard;

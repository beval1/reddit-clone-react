import { Card, Box, Typography, styled } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import RocketIcon from "@mui/icons-material/Rocket";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import CallMissedOutgoingIcon from "@mui/icons-material/CallMissedOutgoing";
import {css} from '@emotion/react'

const StyledBox = styled(Box)({
	padding: "7px 12px",
	borderRadius: "25px",
	display: "flex",
	alignItems: "center",
	gap: "3px",
})

type SortingPostsCard = {
	sorting: "top" | "best" | "hot" | "new",
	setSorting: Dispatch<SetStateAction<"top" | "best" | "hot" | "new">>
}

export const SortingPostsCard = (props: SortingPostsCard) => {
	return (
		<Card
			sx={{
				padding: "10px 0",
			}}
		>
			<Box display="flex" alignItems="center" margin="0 3px">
				<Box
					width="100%"
					display="flex"
					alignItems="center"
					gap="12px"
					marginLeft="10px"
				>
					<StyledBox
						onClick={() => props.setSorting("best")}
						className={`box-hover ${
							props.sorting === "best" ? "selected-sorting" : ""
						}`}
					>
						<RocketIcon />
						<Typography component="p">Best</Typography>
					</StyledBox>
					<StyledBox
						onClick={() => props.setSorting("hot")}
						className={`box-hover ${
							props.sorting === "hot" ? "selected-sorting" : ""
						}`}
					>
						<LocalFireDepartmentIcon />
						<Typography component="p">Hot</Typography>
					</StyledBox>
					<StyledBox
						onClick={() => props.setSorting("new")}
						className={`box-hover ${
							props.sorting === "new" ? "selected-sorting" : ""
						}`}
					>
						<NewReleasesIcon />
						<Typography component="p">New</Typography>
					</StyledBox>
					<StyledBox
						onClick={() => props.setSorting("top")}
						className={`box-hover ${
							props.sorting === "top" ? "selected-sorting" : ""
						}`}
					>
						<CallMissedOutgoingIcon />
						<Typography component="p">Top</Typography>
					</StyledBox>
				</Box>
			</Box>
		</Card>
	);
}
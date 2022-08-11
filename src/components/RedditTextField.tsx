import { alpha, OutlinedInputProps, styled, TextField, TextFieldProps } from "@mui/material";
import React, { useState } from "react";

export const RedditTextField = styled((props: TextFieldProps) => (
			<TextField
				InputProps={
					{ disableUnderline: true } as Partial<OutlinedInputProps>
				}
				{...props}
			/>
		))(({ theme }) => ({
			"& .MuiFilledInput-root": {
				border: "1px solid #e2e2e1",
				overflow: "hidden",
				borderRadius: 4,
				backgroundColor:
					theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
				transition: theme.transitions.create([
					"border-color",
					"background-color",
					"box-shadow",
				]),
				"&:hover": {
					backgroundColor: "transparent",
				},
				"&.Mui-focused": {
					backgroundColor: "transparent",
					boxShadow: `${alpha(
						theme.palette.info.main,
						0.25
					)} 0 0 0 2px`,
					borderColor: theme.palette.info.main,
				},
			},
			"& label.Mui-focused": {
				color: "grey",
			},
		}));



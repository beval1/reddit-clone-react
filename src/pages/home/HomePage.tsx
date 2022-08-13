import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Container,
	Divider,
	Stack,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAuthenticatedUser } from "../../api/authService";
import { getFeed } from "../../api/feedService";
import { IPost } from "../../api/interfaces/IPost";
import { IUser } from "../../api/interfaces/IUser";
import CreatePostCard from "../../components/CreatePostCard";
import { PostCard } from "../../components/PostCard";
import { SortingPostsCard } from "../../components/SortingPostsCard";
import TopCommunitiesCard from "../../components/TopCommunitiesCard";

type Props = {};

const HomePage = (props: Props) => {
	const [posts, setPosts] = useState<IPost[] | null>([]);
	const [sorting, setSorting] = useState<"best" | "hot" | "new" | "top">(
		"best"
	);
	const user: IUser | null = getAuthenticatedUser();

	useEffect(() => {
		getFeed().then((data) => {
			setPosts(data);
		});
	}, []);
	return (
		<Box>
			<Box display="flex" flexDirection="row" gap="16px">
				<Box display="flex" flexDirection="column" gap="20px">
					{user ? <CreatePostCard user={user} /> : null}
					<SortingPostsCard
						setSorting={setSorting}
						sorting={sorting}
					></SortingPostsCard>
					<PostCard></PostCard>
					<PostCard></PostCard>
					<PostCard></PostCard>
					<PostCard></PostCard>
					<PostCard></PostCard>
				</Box>
				<Box
					sx={{
						width: "25vw",
					}}
				>
					<TopCommunitiesCard></TopCommunitiesCard>
				</Box>
			</Box>
		</Box>
	);
};

export default HomePage;

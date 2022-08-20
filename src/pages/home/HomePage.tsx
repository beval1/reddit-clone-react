import {
	Box,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { getFeed } from "../../api/feedService";
import { IPost } from "../../api/interfaces/IPost";
import { IUser } from "../../api/interfaces/IUser";
import { UserContext } from "../../App";
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
	const userContext = useContext(UserContext)
	const user = userContext.user;
	const listCards = posts ? posts.map((p) => <PostCard key={p.id} post={p} />) : null;

	useEffect(() => {
		getFeed().then((data) => {
			if (data) {
				data = data.sort((a, b) => a.votes - b.votes).reverse();
				setPosts(data);
			}
		});
	}, []);
	return (
		<Box>
			<Box display="flex" flexDirection="row" gap="16px">
				<Box display="flex" flexDirection="column" gap="20px" flexBasis="70%">
					{user ? <CreatePostCard user={user} /> : null}
					<SortingPostsCard
						setSorting={setSorting}
						sorting={sorting}
					></SortingPostsCard>
					{listCards}
				</Box>
				<Box
					sx={{
						maxWidth: "25vw",
					}}
					flexBasis="30%"
				>
					<TopCommunitiesCard></TopCommunitiesCard>
				</Box>
			</Box>
		</Box>
	);
};

export default HomePage;

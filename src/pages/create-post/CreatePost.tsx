import { Card, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ImageIcon from "@mui/icons-material/Image";
import LinkIcon from "@mui/icons-material/Link";
import "./CreatePost.css";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import BallotIcon from "@mui/icons-material/Ballot";
import SubredditSelect from "../../components/SubredditSelect";
import { ISubreddit } from "../../api/interfaces/ISubreddit";
import TextPost from "./TextPost";
import LinkPost from "./LinkPost";
import ImagePost from "./ImagePost";
import { UserContext } from "../../App";

type Props = {};

const CreatePost = (props: Props) => {
	const userContext = useContext(UserContext);
	const user = userContext.user;

	const { postTypeParam } = useParams();
	const [postType, setPostType] = useState(postTypeParam || "");
	const [selectedSubreddit, setSelectedSubreddit] = useState<ISubreddit | null>(null);


	const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
		setPostType(newValue);
	};

	// const getSubredditByName = (): ISubreddit | undefined => {
	// 	return user?.subreddits.find(s => s.name === selectedSubreddit);
	// }

	return (
		<Box>
			<Box display="flex" flexDirection="row" gap="16px">
				<Box width="100%">
					<Typography variant="h6">Create Post</Typography>
					<Divider sx={{ margin: "10px 0" }} />
					{user ? (
						<SubredditSelect
							sx={{
								width: "200px",
								backgroundColor: "white",
								marginBottom: "10px",
							}}
							setSelectedSubreddit={setSelectedSubreddit}
							user={user}
						></SubredditSelect>
					) : null}
					<Card>
						<TabContext value={postType}>
							<Box
								sx={{
									borderBottom: 1,
									borderColor: "divider",
								}}
							>
								<TabList onChange={handleTabChange}>
									<Tab
										icon={<PostAddIcon />}
										iconPosition="start"
										label="Post"
										value="text"
									/>
									<Tab
										icon={<ImageIcon />}
										iconPosition="start"
										label="Image"
										value="image"
									/>
									<Tab
										icon={<LinkIcon />}
										iconPosition="start"
										label="Link"
										value="link"
									/>
									<Tab
										icon={<BallotIcon />}
										iconPosition="start"
										label="Poll"
										value="poll"
										disabled
									/>
									<Tab
										icon={<KeyboardVoiceIcon />}
										iconPosition="start"
										label="Talk"
										value="talk"
										disabled
									/>
								</TabList>
							</Box>
							<TabPanel value="text">
								<TextPost subreddit={selectedSubreddit} />
							</TabPanel>
							<TabPanel value="image">
								<ImagePost subreddit={selectedSubreddit} />
							</TabPanel>
							<TabPanel value="link">
								<LinkPost subreddit={selectedSubreddit} />
							</TabPanel>
						</TabContext>
					</Card>
				</Box>
				<Box width="25vw">
					<Card sx={{ padding: "15px" }}>
						<Box display="flex" flexDirection="column" gap="10px">
							<Typography component="h6" variant="h6">
								Posting to Reddit
							</Typography>
							<Divider />
							<Typography component="p" variant="subtitle2">
								1. Remember the human
							</Typography>
							<Divider />
							<Typography component="p" variant="subtitle2">
								2. Behave like you would in real life
							</Typography>
							<Divider />
							<Typography component="p" variant="subtitle2">
								3. Look for the original source of content
							</Typography>
							<Divider />
							<Typography component="p" variant="subtitle2">
								4. Search for duplicates before posting
							</Typography>
							<Divider />
							<Typography component="p" variant="subtitle2">
								5. Read the community’s rules
							</Typography>
							<Divider />
						</Box>
					</Card>
				</Box>
			</Box>
		</Box>
	);
};

export default CreatePost;

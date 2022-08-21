import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Card, Tab } from '@mui/material'
import React, { useState } from 'react'
import Profile from './Profile';

type Props = {}

const MyProfile = (props: Props) => {
    const [tab, setTab] = useState<"profile" | "posts" | "comments" | "upvoted" | "downvoted">("profile");

    const handleTabChange = (event: React.SyntheticEvent, newValue: "profile" | "posts" | "comments" | "upvoted" | "downvoted") => {
        setTab(newValue);
    };

    return (
        <Box>
            <Card>
                <TabContext value={tab}>
                    <Box
                        sx={{
                            borderBottom: 1,
                            borderColor: "divider",
                        }}
                    >
                        <TabList onChange={handleTabChange}>
                            <Tab
                                label="Profile"
                                value="profile"
                            />
                            <Tab
                                label="Posts"
                                value="posts"
                            />
                            <Tab
                                label="Comments"
                                value="comments"
                            />
                            <Tab
                                label="Upvotes"
                                value="upvotes"
                                disabled
                            />
                            <Tab
                                label="Downvotes"
                                value="downvotes"
                                disabled
                            />
                        </TabList>
                    </Box>
                    <TabPanel value="profile">
                        <Profile></Profile>
                    </TabPanel>
                    <TabPanel value="posts">
                    </TabPanel>
                    <TabPanel value="comments">
                    </TabPanel>
                    <TabPanel value="upvotes">
                    </TabPanel>
                    <TabPanel value="downvotes">
                    </TabPanel>
                </TabContext>
            </Card>
        </Box>
    )
}

export default MyProfile
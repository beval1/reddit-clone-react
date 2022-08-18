import { Box } from '@mui/material'
import React from 'react'
import { ISubreddit } from '../api/interfaces/ISubreddit'

type Props = {
    subreddit: ISubreddit | null
}

const SubredditBanner = (props: Props) => {
    return (
        <Box
            component="img"
            sx={{
                height: "25vh",
                width: "600px",
                left: 0,
                position: "relative",
            }}
            alt="The house from the offer."
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
        />
    )
}

export default SubredditBanner
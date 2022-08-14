import { Alert, Box, Button, InputBase, TextField } from "@mui/material";
import React, { useState } from "react";
import { ISubreddit } from "../../api/interfaces/ISubreddit";
import { createPost } from "../../api/postService";
import { ICreatePost } from "../../api/interfaces/ICreatePost";

type ImagePostProps = {
    subreddit: ISubreddit | null;
};

const ImagePost = (props: ImagePostProps) => {
    const [error, setError] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [title, setTitle] = useState<string>("");

    const handlePost = () => {
        const post: ICreatePost = {
            title: title,
            image: {multipartFile: image},
        };
        console.log(post)
        createPost(props.subreddit?.id, post, "image").catch((error: Error) => setError(error.message));
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            gap="10px"
            position="relative"
        >
            {error ? (
                <Box marginBottom="10px">
                    <Alert severity="error">{error}</Alert>
                </Box>
            ) : null}
            <Box
                sx={{
                    border: "1px solid black",
                    padding: "5px",
                    borderRadius: "5px",
                }}
                width="100%"
            >
                <InputBase
                    fullWidth
                    size="medium"
                    placeholder="Title"
                    sx={{
                        marginLeft: "10px",
                    }}
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Box>
            <Box
                sx={{
                    border: "1px solid black",
                    padding: "5px",
                    borderRadius: "5px",
                }}
                width="100%"
                height="200px"
                display="flex"
                alignItems="center"
            >
                <Button
                    variant="contained"
                    component="label"
                    color="info"
                    sx={{
                        margin: "0 auto"
                    }}
                >
                    {image ? image.name : "Upload File"}
                    <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.files == null) {
                                return setImage(null)
                            }
                            return setImage(e.target.files[0]);
                        }}
                    />
                </Button>
            </Box>
            <Box position="relative" width="100%">
                {/* TODO: Move to the fucking right side LOL */}
                <Box width="100%" position="relative" left="0">
                    <Button
                        color="info"
                        variant="contained"
                        onClick={handlePost}
                    >
                        Post
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default ImagePost;

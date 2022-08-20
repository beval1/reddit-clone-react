import { Box, Button, Dialog, DialogContent } from '@mui/material'
import React, { useState } from 'react'
import { createReply, editComment } from '../../api/commentService'
import { IComment } from '../../api/interfaces/IComment'
import { BootstrapDialogTitle } from '../../components/BootstrapDialogTitle'
import { RedditTextField } from '../../components/RedditTextField'

type Props = {
    modal: "edit" | "reply" | null,
    setModal: React.Dispatch<React.SetStateAction<"edit" | "reply" | null>>
    comment: IComment
    setComments: () => void;
}

export const ReplyEditCommentModal = (props: Props) => {
    const [commentContent, setCommentContent] = useState<string>("");

    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.value !== "") {
            setCommentContent(e.target.value)
        }
    }

    const handleAction = () => {
        if (props.modal === "reply") {
            createReply(props.comment.id, commentContent).then(() => props.setComments())
        } else {
            editComment(props.comment.id, commentContent).then(() => props.setComments())
        }
        props.setModal(null);
    }

    return (
        <Dialog
            onClose={() => props.setModal(null)}
            aria-labelledby="customized-dialog-title"
            open={props.modal != null && props.modal != undefined}
            maxWidth="lg"
            PaperProps={{
                sx: {
                    width: "50vw",
                    height: "60vh",
                },
            }}
        >
            <BootstrapDialogTitle
                id="customized-dialog-title"
                onClose={() => props.setModal(null)}
            >
                {props.modal == "edit" ? "Edit" : "Reply"}
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <RedditTextField
                    multiline
                    rows={6}
                    placeholder="Write here..."
                    variant="filled"
                    fullWidth
                    sx={{
                        margin: "0 auto"
                    }}
                    onChange={(e) => handleCommentChange(e)}
                ></RedditTextField>
                <Box marginTop="5px" sx={{
                    display: "flex",
                    justifyContent: "flex-end"
                }}>
                    <Button
                        variant="contained"
                        color="info"
                        onClick={handleAction}
                        disabled={commentContent ? false : true}
                        size="large"
                        sx={{
                            width: "20%"
                        }}
                    >
                        {props.modal === "edit" ? "save" : "post"}
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default ReplyEditCommentModal
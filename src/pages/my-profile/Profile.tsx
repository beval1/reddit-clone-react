import { Avatar, Box, Button, Divider, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserProfile } from '../../api/authService'
import { updateUserProfile } from '../../api/userService'
import { UserContext } from '../../App'
import { RedditTextField } from '../../components/RedditTextField'
import { handleInputChange, transformDate } from '../../utils/utility'

type Props = {}

const Profile = (props: Props) => {
    type FormProps = {
        username: string,
        firstName: string,
        lastName: string,
        email: string,
        birthdate: Date,
        cakeDay: Date,
    }
    const [form, setForm] = useState<FormProps>({} as FormProps)
    const [edit, setEdit] = useState<boolean>(false)
    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    if (!userContext || !userContext.user) {
        return null;
    }

    const handleProfileUpdate = () => {
        setEdit(true)
    }
    const handleCancelChanges = () => {
        setEdit(false)
    }
    const handleSaveChanges = () => {
        updateUserProfile(form.username, form.firstName, form.lastName)
            .then((message) => {
                console.log(message)
                localStorage.clear();
                userContext.setUser(null)
                navigate("/home")
                setEdit(false)
            }).catch(e => console.log(e.message))
        
    }
    const handleProfilePicture = () => {

    }

    return (
        <Box display="flex" gap="10px" flexDirection="column">
            <Box>
                <Typography variant="body1">Account settings</Typography>
                <Divider></Divider>
            </Box>
            <Box display="flex" gap="10px" maxWidth="70%">
                <Avatar
                    alt={userContext.user.username}
                    src={userContext.user.profileImage || ""}
                    variant="square"
                    sx={{ width: 60, height: 60 }}
                />
                {!edit ?
                    <Button
                        variant="contained"
                        color="info"
                        onClick={handleProfilePicture}
                    >Update Profile Picture
                    </Button> : null}
                
                {!edit ? <Button
                    variant="contained"
                    color="info"
                    onClick={handleProfileUpdate}
                >Edit Profile</Button> : null}
            </Box>
            <Box display="flex" flexDirection="column" gap="10px" width="70%">
                <RedditTextField
                    name="username"
                    variant="filled"
                    // size="small"
                    defaultValue={userContext.user.username}
                    onChange={((e: any) => handleInputChange(e, setForm))}
                    disabled={edit ? false : true}
                    label="Username"
                />
                <RedditTextField
                    name="email"
                    variant="filled"
                    // size="small"
                    defaultValue={userContext.user.email}
                    onChange={((e: any) => handleInputChange(e, setForm))}
                    disabled
                    label="email"
                />
                <RedditTextField
                    name="cakeDay"
                    variant="filled"
                    defaultValue={transformDate(userContext.user.createdOn)}
                    onChange={((e: any) => handleInputChange(e, setForm))}
                    disabled
                    label="Cake Day"
                />
                <RedditTextField
                    name="firstName"
                    variant="filled"
                    // size="small"
                    defaultValue={userContext.user.firstName}
                    onChange={((e: any) => handleInputChange(e, setForm))}
                    disabled={edit ? false : true}
                    label="First Name"
                />
                <RedditTextField
                    name="lastName"
                    variant="filled"
                    // size="small"
                    defaultValue={userContext.user.lastName}
                    onChange={((e: any) => handleInputChange(e, setForm))}
                    disabled={edit ? false : true}
                    label="Last Name"
                />
                {/* <RedditTextField
                    name="birthDate"
                    variant="filled"
                    defaultValue={transformDate(userContext.user.birthdate)}
                    onChange={((e: any) => handleInputChange(e, setForm))}
                    disabled={edit ? false : true}
                    label="Birthdate"
                    type="date"
                />   */}
                <Box display="flex" gap="20px">
                    {edit ?
                        <Button
                            variant="contained"
                            color="info"
                            onClick={handleSaveChanges}
                        >Save Changes
                        </Button> : null}
                    {edit ?
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleCancelChanges}
                        >Cancel Changes
                        </Button> : null}
                </Box>
            </Box>
        </Box>
    )
}

export default Profile
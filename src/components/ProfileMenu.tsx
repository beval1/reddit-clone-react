import { Box, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App'

type Props = {
    profileDropdown: HTMLElement | null,
    setProfileDropdown: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}

export const ProfileMenu = (props: Props) => {

    const navigate = useNavigate();
    const userContext = useContext(UserContext)

    const handleCloseUserMenu = () => {
        props.setProfileDropdown(null);
    };

    const handleProfile = () => {
        navigate("/users/my-profile")
        props.setProfileDropdown(null)
    }

    const handleLogout = () => {
        props.setProfileDropdown(null)
        userContext.setUser(null);
        localStorage.clear();
    }

    return (
        <Box>
            <Menu
                // sx={{mt: "10px"}}
                id="menu-appbar"
                anchorEl={props.profileDropdown}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(props.profileDropdown)}
                onClose={handleCloseUserMenu}
            >
                    <MenuItem onClick={handleProfile}>
                        <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                    <MenuItem  onClick={handleLogout}>
                        <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
            </Menu>
        </Box>
    )
}

export default ProfileMenu
import React, { useState } from 'react'
import { Box, AppBar, Toolbar, Typography, Button, Tabs, Tab } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from '../Redux/Store';
import toast from 'react-hot-toast';
export default function Header() {
    const [value, setValue] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let isLogIn = useSelector((state) => state.isLogIn);
    // persist login page as it get logout automatically
    isLogIn = isLogIn || localStorage.getItem('userId');

    //handle logout
    const handleClick = () => {
        try {
            dispatch(authActions.logout());
            toast.success("Logout Succesfully!");
            navigate('/');
            localStorage.clear();
        } catch (error) {
            console.log(error);
        }
    }
    const handleChange = (e, val) => {
        setValue(val);
    }
    return (
        <>
            <AppBar position='sticky'>
                <Toolbar>
                    <Typography variant='h4'>
                        BlogVibe
                    </Typography>
                    {/* Yaha pe agar user login hai toh sirf about section show hoga */}
                    {!isLogIn ? (<Box display={'flex'}>
                        <Button sx={{ margin: 2, color: 'white' }} LinkComponent={Link} to="/">Home</Button>
                        <Button sx={{ color: 'white' }} LinkComponent={Link} to="/about">About</Button>
                    </Box>) : (<Button sx={{ color: 'white', margin: 2 }} LinkComponent={Link} to="/about">About</Button>)}
                    {isLogIn && <Box display={'flex'} marginLeft='auto' marginRight='auto'>
                        <Tabs textColor="inherit" value={value} onChange={handleChange}>
                            <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
                            <Tab label="My Blogs" LinkComponent={Link} to="/myBlogs" />
                            <Tab label="Create Blog" LinkComponent={Link} to="/createBlog" />
                        </Tabs>
                    </Box>}
                    <Box display={'flex'} marginLeft='auto'>
                        {!isLogIn && <> <Button sx={{ margin: 1, color: 'white' }} LinkComponent={Link} to="/login">Login</Button>
                            <Button sx={{ margin: 1, color: 'white' }} LinkComponent={Link} to="/register">Register</Button></>}
                        {isLogIn && <><Button onClick={handleClick} sx={{ margin: 1, color: 'white' }}>Logout</Button></>}
                    </Box>
                </Toolbar>
            </AppBar >
        </>
    )
}

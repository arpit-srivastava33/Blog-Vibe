import { Box, Typography } from '@mui/material'
import React from 'react'
import Footer from './Footer'

export default function About() {
    return (
        <>
            <Box width={'60%'} border={3} borderRadius={3} margin='auto' marginTop={3} padding={3} boxShadow="10px 10px 20px #ccc" display='flex' flexDirection='column'>
                <Typography
                    variant='h2'
                    textAlign='center'
                    fontWeight='bold'
                    color='grey'
                    marginBottom={3}
                >
                    BlogVibe
                </Typography>
                <Typography
                    variant='h6'
                    textAlign='center'
                    fontWeight='bold'
                    color='grey'
                >
                    BlogVibe is an exciting online platform dedicated to bloggers and blog enthusiasts alike. Our mission is to provide a creative and engaging space where users can effortlessly create and explore blogs while connecting with a vibrant community of like-minded individuals.
                    <br /> <br />
                    To get started, the first step is to register by creating an account. Once registered, users can log in to access their personalized dashboard, which serves as the central hub for their blogging journey. From there, users can easily create and manage their own blogs, crafting their unique content and style. Importantly, BlogVibe ensures the privacy and control of users' blogs by allowing them to edit and delete their own posts. This means you have the freedom to refine your thoughts and manage your content as you see fit, all while enjoying the ability to explore and interact with other captivating blogs within the community.
                </Typography>
            </Box>
            {/* <Box width={'60%'} border={3} borderRadius={3} margin='auto' marginTop={3} padding={3} boxShadow="10px 10px 20px #ccc" display='flex' flexDirection='column'>
                <Typography
                    variant='h6'
                    textAlign='center'
                    fontWeight='bold'
                    color='grey'
                >
                </Typography>
            </Box> */}
            <Box sx={{ marginTop: '150px' }}>
                <Footer />
            </Box>
        </>
    )
}

import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <>
            <Box width={'60%'} border={3} borderRadius={3} margin='auto' marginTop={15} padding={3} boxShadow="10px 10px 20px #ccc"
                display='flex'
                alignItems={'center'}
                justifyContent={'center'}
                flexDirection={'column'}
            >
                <Typography
                    variant='h2'
                    textAlign='center'
                    fontWeight='bold'
                    color='grey'
                    marginBottom={3}
                >
                    Welcome to Blog Vibe
                </Typography>
                <Typography
                    variant='body2'
                    textAlign='center'
                    fontWeight='bold'
                    color='grey'
                    marginBottom={3}
                >
                    "Don't focus on having a great blog. Focus on producing a blog that's great for your readers."
                </Typography>
                <Button
                    variant='contained'
                    color="primary"
                    sx={{ marginTop: 1, borderRadius: 3, marginBottom: 2, padding: "10px", width: 200 }}
                    LinkComponent={Link} to="/login"
                >
                    Get Started
                </Button>
            </Box>
        </>
    )
}

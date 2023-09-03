import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Box, IconButton } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <>
            <Box
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                            ? theme.palette.grey[200]
                            : theme.palette.grey[800],
                    position: "fixed",
                    bottom: '0',
                    width: "100%",
                    zIndex: "-1",
                    padding: "12px"

                }}
                component="footer"
            >
                <Container maxWidth="sm">
                    <Typography color="text.secondary" align="center">
                        <Link to="/about">
                            <IconButton>
                                <TwitterIcon color="primary" />
                            </IconButton>
                        </Link>
                        <Link to="https://github.com/arpit-srivastava33">
                            <IconButton>
                                <GitHubIcon sx={{ color: 'black' }} />
                            </IconButton>
                        </Link>
                        <Link to="https://www.linkedin.com/in/arpit-srivastava-7a561b208/">
                            <IconButton>
                                <LinkedInIcon color="primary" />
                            </IconButton>
                        </Link>
                        <Link to="/about">
                            <IconButton>
                                <InstagramIcon sx={{ color: '#E4405F' }} />
                            </IconButton>
                        </Link>
                    </Typography>
                    <Typography variant="h6" color="text.primary" align="center">
                        {"Copyright © "}
                        {new Date().getFullYear()}
                        {"."} All rights reserved
                    </Typography>
                    <Typography variant="body1" color="text.primary" align="center">
                        Made with ❤️ by Arpit Srivastava
                    </Typography>
                </Container>
            </Box>
        </>
    );
}
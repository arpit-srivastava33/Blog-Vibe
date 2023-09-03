import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function Blogcard(props) {
    const navigate = useNavigate();
    // handle blog updation
    const handleEdit = () => {
        navigate(`/blog-details/${props.id}`);
    }
    // handle blog delete
    const handleDelete = async () => {
        try {
            const { data } = await axios.delete(`/api/v1/blog/deleteBlog/${props.id}`);
            if (data?.success) {
                toast.success("Blog Deleted");
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Card sx={{ width: "40%", margin: 'auto', marginTop: 2, boxShadow: "5px 5px 10px #ccc" }}>
                {props.isUser && (
                    <Box display={'flex'}>
                        <IconButton onClick={handleEdit} sx={{ marginLeft: 'auto' }}>
                            <ModeEditIcon color='info' />
                        </IconButton>
                        <IconButton onClick={handleDelete}>
                            <DeleteIcon color='error' />
                        </IconButton>
                    </Box>
                )}
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            B
                        </Avatar>
                    }
                    title={props.username}

                />
                <CardMedia
                    component="img"
                    height="500"
                    image={props.image}
                />
                <CardContent>
                    <Typography variant="h6" color="text.secondary">
                        Title: {props.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Description: {props.description}
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
}
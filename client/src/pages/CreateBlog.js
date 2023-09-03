import React, { useState } from 'react'
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast';

export default function CreateBlog() {
    const id = localStorage.getItem('userId');
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        image: ''
    })
    // input field change
    const handleChange = (e) => {
        setInputs(prevVal => ({
            ...prevVal,
            [e.target.name]: e.target.value
        }))
    }
    // form handle submit create blog
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`/api/v1/blog/createBlog`, {
                title: inputs.title,
                description: inputs.description,
                image: inputs.image,
                user: id
            })
            if (data && data.success) {
                toast.success("Blog Created!");
                navigate('/myBlogs');
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box width={'60%'} border={3} borderRadius={3} margin='auto' marginTop={3} padding={3} boxShadow="10px 10px 20px #ccc" display='flex' flexDirection='column'>
                    <Typography
                        variant='h2'
                        textAlign='center'
                        fontWeight='bold'
                        color='grey'
                    >
                        Create  Post
                    </Typography>
                    <InputLabel
                        sx={{ mb: 2, mt: 3, fontWeight: 'bold', fontSize: '30px' }}
                    >Title
                    </InputLabel>
                    <TextField
                        name="title"
                        value={inputs.title}
                        onChange={handleChange}
                        variant='outlined'
                        required
                    />
                    <InputLabel
                        sx={{ mb: 2, mt: 3, fontWeight: 'bold', fontSize: '30px' }}
                    >Description
                    </InputLabel>
                    <TextField
                        name="description"
                        value={inputs.description}
                        onChange={handleChange}
                        variant='outlined'
                        required
                    />
                    <InputLabel
                        sx={{ mb: 2, mt: 3, fontWeight: 'bold', fontSize: '30px' }}
                    >ImageUrl
                    </InputLabel>
                    <TextField
                        name="image"
                        value={inputs.image}
                        onChange={handleChange}
                        variant='outlined'
                        required
                    />
                    <Button type="submit" color="primary" variant='contained' sx={{ width: "200px", margin: 'auto', mt: '20px', borderRadius: '50px', fontSize: '20px', padding: '20px' }}>SUBMIT</Button>
                </Box>
            </form>
        </>
    )
}

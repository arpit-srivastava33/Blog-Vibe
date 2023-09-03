import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import { toast } from 'react-hot-toast'

export default function BlogDetail() {
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({})
    const id = useParams().id
    //get blog details
    const getBlogDetail = async () => {
        try {
            const { data } = await axios.get(`/api/v1/blog/getBlog/${id}`)
            if (data?.success) {  //conditional/optional chaining
                setInputs({
                    title: data?.blog.title,
                    description: data?.blog.description,
                    image: data?.blog.image
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getBlogDetail();
        // eslint-disable-next-line
    }, [id])
    // input field change
    const handleChange = (e) => {
        setInputs(prevVal => ({
            ...prevVal,
            [e.target.name]: e.target.value
        }))
    }
    // form handle submit for update
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`/api/v1/blog/updateBlog/${id}`, {
                title: inputs.title,
                description: inputs.description,
                image: inputs.image,
                user: localStorage.getItem('userId')
            })
            if (data?.success) {
                toast.success("Blog Updated!");
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
                        Update  Post
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
                    <Button
                        type="submit"
                        color="primary"
                        variant='contained'
                        sx={{ width: "200px", margin: 'auto', mt: '20px', borderRadius: '50px', fontSize: '20px', padding: '20px' }}
                    >UPDATE
                    </Button>
                </Box>
            </form>
        </>
    )
}

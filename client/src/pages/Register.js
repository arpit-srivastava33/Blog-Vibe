import React, { useState } from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from 'axios'
export default function Register() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        username: '',
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        setInputs((prevVal) => {
            return (
                {
                    ...prevVal,
                    [e.target.name]: e.target.value
                }
            )
        })
    }
    //handle register
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/v1/user/register', { username: inputs.username, email: inputs.email, password: inputs.password })
            console.log(data);
            if (data?.success) {
                toast.success("User Register Succesfully!");
                navigate('/login')
            }
        } catch (error) {
            const mssg = error.response.data.message;
            toast.error(mssg);
        }
    }
    return (
        <>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <Box width={500}
                    display='flex'
                    alignItems={'center'}
                    justifyContent={'center'}
                    flexDirection={'column'}
                    margin="auto"
                    marginTop='50px'
                    boxShadow="10px 10px 20px #ccc"
                >
                    <Typography variant='h4' padding='30px' textTransform={'uppercase'}>Register</Typography>
                    <TextField
                        placeholder='username'
                        name="username"
                        required
                        variant="outlined"
                        color="primary"
                        type="text"
                        value={inputs.username}
                        onChange={handleChange}
                        sx={{ mb: 3, width: 300 }}
                    />
                    <TextField
                        placeholder="email"
                        name="email"
                        required
                        variant="outlined"
                        color="primary"
                        type="email"
                        value={inputs.email}
                        onChange={handleChange}
                        sx={{ mb: 3, width: 300 }}
                    />
                    <TextField
                        placeholder="password"
                        name="password"
                        required
                        variant="outlined"
                        color="primary"
                        type="password"
                        value={inputs.password}
                        onChange={handleChange}
                        sx={{ mb: 3, width: 300 }}
                    />
                    <Button
                        variant='contained'
                        color="primary"
                        type="submit"
                        sx={{ marginTop: 3, borderRadius: 3, marginBottom: 3 }}
                    >Register
                    </Button>
                    <Box sx={{ marginBottom: 5 }}>
                        <small><strong>Already have an account? </strong><Link to="/login"><strong>Login here</strong></Link></small>
                    </Box>
                </Box>
            </form>
        </>
    )
}

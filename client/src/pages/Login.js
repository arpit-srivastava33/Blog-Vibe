import React, { useState } from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { authActions } from '../Redux/Store'
import toast from 'react-hot-toast';
import Footer from '../component/Footer'
export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/v1/user/login', { email: inputs.email, password: inputs.password })
            if (data.success) {
                dispatch(authActions.login());
                localStorage.setItem('userId', data.user._id)
                toast.success("User Login Succesfully!");
                navigate('/blogs')
            }
        } catch (error) {
            // const { data: { errors } } = error.response
            // console.log(errors[0].msg);
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
                    <Typography variant='h4' padding='30px'>Login to Continue</Typography>
                    <TextField
                        label="Email"
                        placeholder="Email"
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
                        label="Password"
                        placeholder="Password"
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
                        sx={{ marginTop: 1, borderRadius: 3, marginBottom: 2, padding: "5px", width: 100 }}
                    >Login
                    </Button>
                    <Box sx={{ marginBottom: 5 }}>
                        <small><strong>Not a user? </strong><Link to="/register"><strong>Register here</strong></Link></small>
                    </Box>
                </Box>
            </form>
            <Box sx={{ marginTop: "80px" }}>
                <Footer />
            </Box>
        </>
    )
}

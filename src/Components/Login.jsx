import { CloseOutlined } from '@mui/icons-material';
import { Box, Button, Dialog, IconButton, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setislogin, setlogin } from '../Redux/slice';

const Login = () => {
    const [userinfo, setuserinfo] = useState({
        username: "",
        password: ""
    })
    const dispatch = useDispatch();
    const { islogin, login } = useSelector((state) => state.slice)
    const onChange = (event) => {
        setuserinfo((previous) => ({
            ...previous,
            [event.target.name]: event.target.value,
        }));
    };
    const handleclose = () => {
        dispatch(setislogin(false))
    }
    const submit = () => {
        localStorage.setItem("userinfo", JSON.stringify(userinfo));
        dispatch(setlogin(true));
        handleclose();
    };
    return (
        <Dialog open={islogin} onClose={handleclose}>
            <Box
                sx={{
                    p: 4,
                    width: '22rem',
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: 'background.paper',
                }}
            >
                <Box className="flex justify-end">
                    <IconButton onClick={handleclose}>
                        <CloseOutlined />
                    </IconButton>
                </Box>

                <Typography
                    variant="h5"
                    align="center"
                    gutterBottom
                    sx={{ fontWeight: 500, color: '#ff742b' }}
                >
                    Welcome Back
                </Typography>

                <Typography
                    variant="subtitle2"
                    align="center"
                    sx={{ color: 'text.secondary', mb: 3 }}
                >
                    Please login to your account
                </Typography>

                <Box className="flex flex-col gap-3">
                    <TextField
                        label="Username"
                        variant="outlined"
                        name='username'
                        value={userinfo.username}
                        onChange={onChange}
                        fullWidth
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 1,
                                '& fieldset': {
                                    borderColor: '#d3d3d3', // Set border color to gray
                                },
                                '&:hover fieldset': {
                                    borderColor: '#d3d3d3', // Hover state border color
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#d3d3d3', // Focused state border color
                                    boxShadow: 'none', // Ensures no shadow on focus
                                },
                            },
                            '& .MuiInputBase-root': {
                                fontSize: '1rem',
                                padding: '0',
                                height: '100%',
                            },
                        }}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        name='password'
                        value={userinfo.password}
                        onChange={onChange}
                        fullWidth
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 1,
                                '& fieldset': {
                                    borderColor: '#d3d3d3', // Set border color to gray
                                },
                                '&:hover fieldset': {
                                    borderColor: '#d3d3d3', // Hover state border color
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#d3d3d3', // Focused state border color
                                    boxShadow: 'none', // Ensures no shadow on focus
                                },
                            },
                            '& .MuiInputBase-root': {
                                fontSize: '1rem',
                                padding: '0',
                                height: '100%',
                            },
                        }}
                    />

                    <Button
                        variant="contained"
                        fullWidth
                        onClick={submit}
                        sx={{
                            mt: 2,
                            py: 1,
                            borderRadius: 2,
                            textTransform: 'none',
                            fontSize: '1rem',
                            backgroundColor: '#ff742b',

                        }}
                    >
                        Login
                    </Button>
                </Box>
            </Box>
        </Dialog>
    );
};

export default Login;

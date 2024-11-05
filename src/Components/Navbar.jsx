import React, { useEffect, useState } from 'react'
import { AppBar, Box, Container, TextField, Typography } from '@mui/material'
import { Search, SettingsApplicationsOutlined } from '@mui/icons-material'
import company from '../company.svg'
import { CiSettings } from 'react-icons/ci'
import { useDispatch, useSelector } from 'react-redux'
import { Getnews, setislogin, setlogin, setquery } from '../Redux/slice'
const Navbar = () => {
    const [userinfo, setuserinfo] = useState(null)
    const dispatch = useDispatch();
    const { query,
        tags,
        by,
        time,
        page, data, islogin, login } = useSelector((state) => state.slice)
    const queryhandler = (value) => {
        dispatch(setquery(value))
    }
    console.log(login);

    useEffect(() => {
        const storedUserInfo = localStorage.getItem("userinfo") ? localStorage.getItem("userinfo") : null;
        console.log(storedUserInfo);

        if (storedUserInfo !== null) {
            dispatch(setlogin(true));
            setuserinfo(JSON.parse(storedUserInfo));
        }
    }, [islogin, login, dispatch]);
    const openlogin = () => {
        dispatch(setislogin(true))
    }
    console.log(userinfo);

    return (
        <AppBar position="static"

            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "4rem",
                margin: "auto",
                width: {
                    md: "80%",
                    sm: "100%"

                },
                backgroundColor: '#ff742b'
            }} >
            <Box className="flex  w-full justify-between items-center px-1">
                <Box className="flex justify-center basis-1/6 items-center ">
                    <h1
                        className='border h-fit flex justify-center items-center text-xl px-2 py-1 mx-2 border-white basis-1/5 '
                    >
                        H
                    </h1>
                    <h1 className='text-xl hidden font-[450]   md:flex justify-center leading-[1rem]  text-black basis-3/5'>
                        {login && userinfo
                            ? <span className="break-words text-sm  px-1 whitespace-normal">
                                {userinfo.username}
                            </span>
                            : <span onClick={openlogin}  >
                                Search Hacker News
                            </span>
                        } </h1>
                </Box>
                <Box className="basis-4/6  flex justify-between p-2 items-center     text-black bg-white">
                    <Search color='#ff742b' className='text-[#ff742b] basis-[5%] hidden md:block' />
                    <TextField
                        className=' basis-full md:basis-[70%]'
                        variant="standard"
                        value={query}
                        onChange={(e) => {
                            queryhandler(e.target.value)
                        }}
                        InputProps={{ disableUnderline: true }}
                        sx={{
                            height: '2rem',
                            '& .MuiInputBase-root': {
                                fontSize: '1rem',
                                padding: '0',
                                height: '100%',
                            },
                            '& .MuiInputBase-root.Mui-focused': {
                                borderColor: 'transparent', // Removes the focus border color
                                boxShadow: 'none', // Removes the shadow if there's any
                            },
                        }}
                    />
                    <Box className="basis-[35%] hidden md:flex justify-end items-center ">
                        <h1 className='text-gray-300  text-sm ' >
                            Search By
                        </h1>
                        <img src={company} alt="" className='h-6  object-cover ' />
                    </Box>

                </Box>
                <Box className="basis-1/6 flex justify-end items-center ">
                    <CiSettings size={30} color='black' fontWeight={"bold"} />
                </Box>


            </Box>

        </AppBar>
    )
}

export default Navbar

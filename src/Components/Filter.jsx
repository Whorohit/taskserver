import React from 'react'
import { Box, MenuItem, Select, Typography } from '@mui/material'
import { Label } from '@mui/icons-material'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setBy, settags, settime } from '../Redux/slice';
const Filter = () => {
    const { query,
        tags,
        by,
        time,
        page, data } = useSelector((state) => state.slice)
    const dispatch = useDispatch();
    const CustomSelect = styled(Select)({
        padding: ".1rem",
        height: '1.5rem',
        border: '1px solid gray', // Initial border color
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'gray', // Ensures border color is gray initially
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'gray', // Keeps border color gray on hover
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'gray', // Prevents color change on focus
            boxShadow: 'none', // Removes any shadow that might appear on focus
        },
        '&.Mui-focused': {
            outline: 'none', // Removes outline when focused
        },
        '& .MuiSelect-select': {
            padding: 0,
            height: '100%',
        },
    });
    const tagshandler = (value) => {
        console.log(value);

        dispatch(settags(value))
    }
    const byhandler = (value) => {
        dispatch(setBy(value))
    }
    const timehandler = (value) => {
        dispatch(settime(value))
    }

    return (
        <Box className="flex justify-between bg-[#f6f6ef] px-2 py-2   mx-auto w-full md:w-[80%]  ">

            <Box className="basis-2/3 flex  flex-row  items-center gap-1">
                <Box className="flex items-center  justify-center gap-1" >
                    <Typography variant='subtitle2' className='text-black'>Search</Typography>
                    <CustomSelect
                        displayEmpty
                        value={tags}
                        onChange={(e) => {
                            tagshandler(e.target.value)
                        }}
                        className='focus-within:outline-none'
                        sx={{
                            height: '1.5rem',
                            border: '.5px solid gray',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'gray',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'gray',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'gray', // Prevents color change on focus
                            },
                            '& .MuiSelect-select': {
                                padding: 0,
                                height: '100%',
                            },
                        }}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem selected value={"story"}>Stories</MenuItem>
                        <MenuItem value={"ask_hn"}>Ask HN</MenuItem>
                        <MenuItem value={"show_hn"}>Show HN</MenuItem>
                        <MenuItem value={"comment"}>Comments</MenuItem>
                        <MenuItem value={"launch_hn"}>Launch HN</MenuItem>
                        <MenuItem value={"job"}>Jobs</MenuItem>
                        <MenuItem value={"poll"}>Polls</MenuItem>
                    </CustomSelect>
                </Box>
                <Box className="flex items-center  justify-center gap-1" >
                    <Typography variant='subtitle2' className='text-black'>by</Typography>
                    <CustomSelect
                        defaultValue=""
                        displayEmpty
                        sx={{
                            height: '1.5rem',
                            border: '1px solid gray',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'gray',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'gray',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'gray', // Prevents color change on focus
                            },
                            '& .MuiSelect-select': {
                                padding: 0,
                                height: '100%',
                            },
                        }}
                        value={by}
                        onChange={(e) => {
                            byhandler(e.target.value)
                        }}

                    >
                        <MenuItem value={0}>Date</MenuItem>
                        <MenuItem value={1}>Popularity</MenuItem>

                    </CustomSelect>
                </Box>
                <Box className="flex items-center  justify-center gap-1" >
                    <Typography variant='subtitle2' className='text-black'>for</Typography>
                    <CustomSelect
                        defaultValue=""
                        displayEmpty
                        sx={{
                            height: '1.5rem',
                            border: '1px solid gray',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'gray',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'gray',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'gray', // Prevents color change on focus
                            },
                            '& .MuiSelect-select': {
                                padding: 0,
                                height: '100%',
                            },
                        }}
                        value={time}
                        onChange={(e) => {
                            timehandler(e.target.value)
                        }}
                    >
                        <MenuItem value={-1}>All Time</MenuItem>
                        <MenuItem value={1}>Last 24h</MenuItem>
                        <MenuItem value={2}>Past Week</MenuItem>
                        <MenuItem value={3}>Past Week</MenuItem>
                        <MenuItem value={4}>Past Year</MenuItem>

                    </CustomSelect>
                </Box>
            </Box>
            <Box className="basis-1/3  hidden md:flex  justify-end items-center">
                38,296,562 results (0.005 seconds)


            </Box>

        </Box>
    )
}

export default Filter

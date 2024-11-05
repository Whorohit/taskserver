// slice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    query: "",
    tags: "story",
    by: 0,
    time: -1,
    page: 0,
    data: [],
    resulttime: "",
    islogin: false,
    login: false,
};

export const Getnews = createAsyncThunk('admin/login', async ({ query = '', tags = '', by = 0, time = undefined, page = 0 } = {}) => {
    try {
        const baseUrl = 'https://hn.algolia.com/api/v1/search';
        const params = new URLSearchParams();

        if (query) params.append('query', query);
        if (page) params.append('page', page);
        if (tags) params.append('tags', tags);

        if (time > -1) {
            const now = Math.floor(Date.now() / 1000);
            let startTime;
            switch (time) {
                case 0: startTime = now - 24 * 60 * 60; break;
                case 1: startTime = now - 7 * 24 * 60 * 60; break;
                case 2: startTime = now - 30 * 24 * 60 * 60; break;
                case 3: startTime = now - 365 * 24 * 60 * 60; break;
                default: startTime = null;
            }
            if (startTime !== null) params.append('numericFilters', `created_at_i>${startTime}`);
        }

        if (by === 1) params.append('restrictSearchableAttributes', 'url');

        const { data } = await axios.get(`${baseUrl}?${params}`);

        return data;
    } catch (error) {
        console.log(error);
        return [];

    }
});

const slice = createSlice({
    name: 'misc',
    initialState,
    reducers: {
        settags: (state, action) => { state.tags = action.payload; },
        setquery: (state, action) => { state.query = action.payload; },
        setBy: (state, action) => { state.by = action.payload; },
        settime: (state, action) => { state.time = action.payload; },
        incrementpage: (state) => { state.page += 1; },
        decrementpage: (state) => { state.page -= 1; },
        setpage: (state, action) => { state.page = action.payload },
        setislogin:(state,action)=>{state.islogin=action.payload},
        setlogin:(state,action)=>{state.login=action.payload},
    },
    extraReducers: (builder) => {
        builder.addCase(Getnews.fulfilled, (state, action) => { state.data = action.payload; });
        builder.addCase(Getnews.rejected, (state) => { state.data = []; });
    }
});

export const { settags, setquery, settime, incrementpage, decrementpage, setBy, setpage,setislogin,setlogin

} = slice.actions;
export default slice.reducer;

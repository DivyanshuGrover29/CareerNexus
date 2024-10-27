import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:"job",
    initialState:{
        allJobs:[],//empty array rkh skte ya null kuch bhi likh skte
        allAdminJobs:[],//for admin
        singleJob:null,
        searchJobByText:"",
        allAppliedJobs:[],//for view profile pr sari applied jobs show ho
        searchedQuery:"",//This is for searching in hero section and carousel
    },
    reducers:{
        // actions
        setAllJobs:(state,action) => {
            state.allJobs = action.payload;
        },

        setAllAdminJobs:(state,action) => {
            state.allAdminJobs = action.payload;
        },

        setSingleJob:(state,action) => {
            state.singleJob = action.payload;
        },
        
        setSearchJobByText:(state,action) => {
            state.searchJobByText = action.payload;
        },

        setAllAppliedJobs:(state,action) => {
            state.allAppliedJobs = action.payload;
        },

        setSearchedQuery:(state,action)=> {
            state.searchedQuery = action.payload;
        }
    }
});

export const {setAllJobs, setAllAdminJobs, setSingleJob ,setSearchJobByText, setAllAppliedJobs , setSearchedQuery} = jobSlice.actions;
export default jobSlice.reducer;
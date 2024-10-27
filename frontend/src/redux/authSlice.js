//This is for user ke regarding information ke lie
//using createSlice here
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    //give name, initialState , reducers(Actions)
    name:"auth",
    initialState:{
        loading:false,
        //user is jo show kr raha login nhi hai to h show login if hai toh show avatar
        user:null
    },
    reducers:{
        //actions
        setLoading:(state , action) => {
            state.loading = action.payload;
        },

        setUser:(state , action) => {
            state.user = action.payload
        }
    }
});

export const { setLoading , setUser } = authSlice.actions;
export default authSlice.reducer;

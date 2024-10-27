import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name:"company",
    initialState:{
        singleCompany:null,
        companies:[],//yeh sari companies jo display hogi admin home page pe
        searchCompanyByText:"",
    },
    reducers:{
        // actions

        setSingleCompany:(state,action) => { //for only single company
            state.singleCompany = action.payload;
        },

        setCompanies:(state,action) => {
            state.companies = action.payload;
        },

        setSearchCompanyByText:(state,action) => {
            state.searchCompanyByText = action.payload
        }
    }
})
export const { setCompanies , setSingleCompany , setSearchCompanyByText} = companySlice.actions;
export default companySlice.reducer;
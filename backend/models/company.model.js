//Company Schema

import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String, 
    },
    website:{
        type:String 
    },
    location:{
        type:String 
    },
    logo:{
        type:String // URL to company logo yaha par url aaega cloudinary se baad me dekhege 
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User', // reference given user means making relation table with user  kis user ne company preapre ya create kri hai 
        required:true
    }
},{timestamps:true})
export const Company = mongoose.model("Company", companySchema);
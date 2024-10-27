//Application Schema: means user apply or apply pending accepted rejected

import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job',//applcation ka realtion table with job
        required:true
    },
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User', //user table se relation kitne user ne apply kra and all yeh sb toh user se hi rhaega
        required:true
    },
    status:{
        type:String,
        enum:['pending', 'accepted', 'rejected'],
        default:'pending'
    }
},{timestamps:true});
export const Application  = mongoose.model("Application", applicationSchema);
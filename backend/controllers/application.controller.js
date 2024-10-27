import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

//First will create it for applyJob
export const applyJob = async (req,res) => {
    try{
        //user id honi chahie pehle toh tabhi apply kr paega
       const userId = req.id;
       //fir job id hogi toh hi apply kr paege
       const jobId = req.params.id;
       if(!jobId){
        return res.status(400).json({
            message:"Job Id is required.",
            success:false
        })
       };
       
       //Check if the user has already applied for the job
       const existingApplication = await Application.findOne({ job:jobId , applicant:userId });
       if(existingApplication){
        return res.status(400).json({
            message:"You have already applied for this job",
            success:false
        })
       };
       
       //Check job exist kr bhi rahi hai toh apply krege hi 
       //For this hmne upar job model bhi call kra
       const job = await Job.findById(jobId);
       if(!job){
        return res.status(404).json({
            message: "Job not found",
            succes:false
        })
       }

       //Creating a new application for applying job
       const newApplication = await Application.create({
         job:jobId,
         applicant:userId,
       });

       //job model me applications schema bna rkha hai
       job.applications.push(newApplication._id);
       await job.save();
       return res.status(201).json({
        message:"Job applied successfully",
        success:true
       })
    }catch(error){
        console.log(error);
    }
};

//now will do for getAppliedJobs 
//kitni jobs applied ho chuki hai vo show hogi jo mene apply kri hai
export const getAppliedJobs = async(req,res)=>{
    try{
      const userId = req.id;
      const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
        path:'job',
        options:{sort:{createdAt:-1}},//latest se oldest order me dikhe
        //again populate kra
        populate:{
            //Ab job ke andar company ka complete date chahie not only its id
            path:'company',
            options:{sort:{createdAt:-1}},
        }
      });

      if(!Application){
        return res.status(404).json({
            message: "No Applications",
            succes:false
        })
      };
      return res.status(200).json({
        application,
        success:true
      })
    }catch(error){
        console.log(error);
    }
}


//Now will do it for -getApplicants
//This is for admin dekhega kitne user ne apply kiya hai
export const getApplicants = async(req,res) =>{
    try{ 
        //pehle job dekhi fir dekhege kitne user ne apply kra
       const jobId = req.params.id;
       const job = await Job.findById(jobId).populate({
        path:'applications',
        options:{sort:{createdAt:-1}},
        populate:{
            path:'applicant'
        }
       });
       
       if(!job){
        return res.status(404).json({
            message:'Job not found.',
            success:false
        })
      };
       return res.status(200).json({
         job, 
         succees:true
    });
  } catch (error) {
    console.log(error);
}
}

//Now for updateStatus
//that status is pending approved rejected

export const updateStatus = async(req,res)=> {
    try{
       const { status } = req.body;
       const applicationId = req.params.id;
       if(!status){
        return res.status(400).json({
            message:'status is required',
            success:false
        })
    };

    //find the application by application id
    const application = await Application.findOne({_id:applicationId});
    if(!application){
        return res.status(404).json({
            message:"Application not found.",
            success:false
        })
    };

    //Update the status
    application.status = status.toLowerCase();
    await application.save();//for the updated data dikhe

    return res.status(200).json({
        message:"Status updated successfully.",
        success:true
    });
    }catch(error){
        console.log(error);
    }
}

//end
    
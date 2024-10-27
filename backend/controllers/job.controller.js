import { Job } from "../models/job.model.js";

//admin ke lie post krega job - postJob
export const postJob = async (req, res) => {
  try {
    const {title, description, requirements, salary, location, jobType,experience, position, companyId} = req.body;
    //Job post krne ke lie logged in user ki id tabhi ot paat chlega konse user job post kr raha hai
    const userId = req.id;

    if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
      return res.status(400).json({
        message: "Something is missing.",
        success: false
      })
    };
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId
    });
    return res.status(201).json({
      message: "New job created successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//Student ke lie - getAllJobs
export const getAllJobs = async (req, res) => {
  try {
    //Ab yaha mujhe filtering add krni hai
    //and i will take the keyword from request query or an empty string
    const keyword = req.query.keyword || " ";

    const query = {
      //i is for case-insenstive and regex is the regular expression
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ]
    };

    const jobs = await Job.find(query).populate({
        //populate taki company ka pura data bhi milja enot only companyid
        path: "company",
      }).sort({ createdAt: -1 });

    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//Student ke lie - getJobByID

export const getJobByID = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications"
    });

    if (!job) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false
      })
    };
    return res.status(200).json({
      job,
      success: true
    });
  } catch (error) {
    console.log(error);
  }
};

//4th now for admin kitne job create kr raha hai - getAdminJobs

export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
      createdAt: -1,
    });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false
      });
    }
    return res.status(200).json({
      jobs,
      success: true
    });
  } catch (error) {
    console.log(error);
  }
};

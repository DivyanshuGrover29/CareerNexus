import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import mongoose from "mongoose";
//first will create it for registerCompany

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required.",
        success: false,
      });
    }
    let company = await Company.findOne({ name: companyName });
    //If company name is same toh we dont want same company
    if (company) {
      return res.status(400).json({
        message: "You can't add same company",
        success: false,
      });
    }
    company = await Company.create({
      name: companyName,
      userId: req.id, //authenticate hojaega middleware se and request id
    });

    return res.status(201).json({
      message: "Company registered successfully.",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//Now for getCompany

export const getCompany = async (req, res) => {
  try {
    //for authenticate use of middleware
    const userId = req.id; //logged in user id jo user ne jobs create kri vohi show hogi na
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({
        message: "Companies not found.",
        success: false,
      });
    }
    return res.status(200).json({
      companies,
      success:true
    })
  } catch (error) {
    console.log(error);
  }
};

//Now for get company by id
export const getCompanyById = async (req, res) => {
  try {
    //specific id se
    const companyId = req.params.id; //yaha par id mil jaegi

      // Validate companyId
      if (!mongoose.Types.ObjectId.isValid(companyId)) {
        return res.status(400).json({
          message: "Invalid Company ID format.",
          success: false,
        });
      }
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false
      });
    }
    //If i got company
    return res.status(200).json({
      company,
      success: true
    });
  }catch (error) {
    console.log(error);
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const companyId = req.params.id;
   
    const file = req.file;
 
    //cloudinary aaega idhar
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const logo = cloudResponse.secure_url;

    const updateData = { name, description, website, location, logo };
    const company = await Company.findByIdAndUpdate(companyId, updateData, {new: true});

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      message:"Company information updated.",
      success: true
    });
  } catch (error) {
    console.log(error);
  }
}

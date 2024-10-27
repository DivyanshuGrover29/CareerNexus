import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

//First we will create it for register or sign in
export const register = async(req,res) => {
    try{
        const {fullname , email ,phoneNumber , password , role} = req.body;
        
        //maan lo koi bhi ek field empty hoti
        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            });
        };
        //for file cloudinary call krlia
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        //Now i have to check the user jo register kr raha hai vo id se pehle toh hi exist ni krta
        const user = await User.findOne({email});

       //Agar same email hui toh error
       if(user){
        return res.status(400).json({
            message: 'User already exist with this email.',
            success: false,
        })
    }
       
    //Ab jo password aara hai usko hashed password me convert krege 
    const hashedPassword = await bcrypt.hash(password , 10);
    
    //Now create User
    await User.create({
        fullname,
        email,
        phoneNumber,
        password:hashedPassword,
        role,
        profile:{
            profilePhoto:cloudResponse.secure_url,
        }
    });

    //ab success true ho chuki hai
    return res.status(201).json({
        message:"Account created successfully.",
        success:true
    });
    }catch(error){
       console.log(error);
    }
}

//Now we will make it for LOGIN
  //Ab login me toh user ke sirf email password and role aaega
  export const login = async(req,res) => {
    try{
        const{email,password,role} = req.body;
    
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
    
      //ab hm cehck krege jo id se login kr raha vo exist krti bhi hai ya ni database me aagar ni error show kro
      let user = await User.findOne({email});

      if (!user) {
        return res.status(400).json({
            message: "Incorrect email or password.",
            success: false,
        })
    }
    
    //ab hm check krege password sahi dala hai ya ni
    const isPasswordMatch = await bcrypt.compare(password , user.password);
    if(!isPasswordMatch){
        return res.status(400).json({
            message: "Incorrect email or password.",
            success: false,
        })
    }
    //ab we will check for role too
    if(role != user.role){
        return res.status(400).json({
            message: "Account doesn't exist with current role.",
            success: false
        })
    };
    
    //Now i will create the token
    //me sirf yaha user ki id rkh raha
    const tokenData = {
        userId: user._id //yeh hmare ko daatabase se miljaega
    };

    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });
    
    user = {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile
    }
    //Ab jo token create kra usko cookies me store krvaya hacking se bchne ke lie bhi
    return res.status(200).cookie("token" , token , {maxAge: 1*24*60*60*1000, httpsOnly:true , sameSite:'strict'}). json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true
    })
    }catch(error){
     console.log(error);
    }
}

//Now will make for LOGOUT
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

//Now for updateProfile
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body; 
        const file = req.file;
       
        
        // cloudinary ayega idhar
        //yeh raha cloudinary
        //jo file aari uska uri chahie get from datauri
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);



       let skillsArray;
       if(skills){
         skillsArray = skills.split(",");//skills ko ',' se split krdia
       }
       const userId = req.id; // This is for middleware authnetication and req.id is request id

       let user = await User.findById(userId);

       if (!user) {
        return res.status(400).json({
            message: "User not found.",
            success: false
        })
    }

    //Updating data-agar full name update kra toh vohi chnage hoga bs
    if(fullname) user.fullname = fullname
    if(email) user.email=email
    if(phoneNumber) user.phoneNumber=phoneNumber
    if(bio) user.profile.bio = bio
    if(skills) user.profile.skills = skillsArray

    //resume comes later here...
    if(cloudResponse){
        user.profile.resume = cloudResponse.secure_url // save the cloudinary url
        user.profile.resumeOriginalName = file.originalname // Save the original file name
    }


    await user.save();//main line for saving everything 

    //firse new user create kra
    user = {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile
    }

    return res.status(200).json({
        message:"Profile updated successfully.",
        user,
        success:true
    })
} catch (error) {
    console.log(error);
}
}
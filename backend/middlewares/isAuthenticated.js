import jwt from "jsonwebtoken";

const isAuthenticated = async(req,res,next) => {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"User not authenticated",
                success:false,
            })
        }

        //Agar token exist krta hai then i will decode it
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                success:false
            })
        };
        //If decode bhi hogya toh kuch property milti hai
        req.id = decode.userId;
        //call next()
        next();
        } catch(error){
            console.log(error);
        }
     }
   export default isAuthenticated;
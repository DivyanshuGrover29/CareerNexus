import React, { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import "/src/App.css";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup} from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { setLoading } from "@/redux/authSlice";
import { useDispatch , useSelector } from "react-redux";
import { Loader2 } from "lucide-react";


const Signup = () => {
  const [input , setInput] = useState({
    fullname:"",
    email:"",
    phoneNumber:"",
    password:"",
    role:"",
    file:""
  });
  const { loading,user } = useSelector(store=>store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //For fullname to role 
  const changeEventHandler = (e) =>{
    setInput({...input , [e.target.name] : e.target.value });
  }


  //For files there is different part
  const changeFileHandler = (e) =>{
    setInput({...input , file: e.target.files ?. [0]});
  }
  

  //Function for API Call
  const submitHandler = async(e) =>{
       e.preventDefault();//we write this taki page pura refresh na ho again and again
       //File bhejne ke lie hmme formdata use krna pdta hai
       const formData = new FormData();//formdata object
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }
        
        try{
           //yaha loading true krdi
           dispatch(setLoading(true));
          //backend url called basically api called
          const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
            headers:{
              'Content-Type': "multipart/form-data"
            },
            withCredentials:true,
          });
          
          if(res.data.success){
            //naviagate to the login page
            navigate("/login");
            toast.success(res.data.message);//msg display hoga
          }
        }catch(error){
          console.log(error);
          toast.error(error.response.data.message);
        } finally{
          dispatch(setLoading(false));
      }
  }

  useEffect(()=>{
    if(user){
        navigate("/");//then navigate to home page
    }
 },[])

  return (
    <div>
      <Navbar />
      <div className="mainsignup">
        <form onSubmit={submitHandler} className="formsetup">
          <h1 className="signuplogo">Sign Up</h1>
          <div className="signupform">
            <Label>Full Name</Label>
            <Input 
               type="text"
               value={input.fullname} 
               name="fullname"
               onChange={changeEventHandler}
               placeholder="grover" 
             />
          </div>
          <div className="signupform">
            <Label>Email</Label>
            <Input 
               type="email" 
               value={input.email} 
               name="email"
               onChange={changeEventHandler}
               placeholder="grover@gmail.com" 
             />
          </div>
          <div className="signupform">
            <Label>Phone</Label>
            <Input 
               type="text"
               value={input.phoneNumber} 
               name="phoneNumber"
               onChange={changeEventHandler} 
               placeholder="+91   " 
             />
          </div>
          <div className="signupform">
            <Label>Password</Label>
            <Input 
               type="password" 
               value={input.password} 
               name="password"
               onChange={changeEventHandler}
               placeholder="********"
              />
          </div>
            
         
          <div className="radio-button">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input 
                    type="radio" 
                    name="role" 
                    value="Student" 
                    checked={input.role === 'Student'}
                    onChange={changeEventHandler}
                    className="cursor-pointer w-4 h-4"  
                  />
                <Label htmlFor="option-one">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input 
                    type="radio" 
                    name="role" 
                    value="Recruiter" 
                    checked={input.role === 'Recruiter'}
                    onChange={changeEventHandler}
                    className="cursor-pointer w-4 h-4" 
                 />
                <Label htmlFor="option-two">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="profilebutton">
              <Label>Profile</Label>
              <Input 
                accept="image/*" 
                type="file"
                onChange={changeFileHandler} 
                className="cursor-pointer"
              />
            </div>
          </div>
          {
           loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Signup</Button>
          }
          <span classname="text-sm">Already have an account? <Link to="/Login" className="text-blue-600">Login</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Signup;

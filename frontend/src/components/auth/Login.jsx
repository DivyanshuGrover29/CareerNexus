import React, { useState, useEffect} from "react";
import Navbar from "../shared/Navbar";
import "/src/App.css";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { RadioGroup} from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch , useSelector} from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";


const Login = () => {
  const [input , setInput] = useState({
    email:"",
    password:"",
    role:"",
  });

  //useSelector se loading lae
  const { loading,user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

   //For email to role 
   const changeEventHandler = (e) =>{
    setInput({...input , [e.target.name] : e.target.value });
  }

  //Function for API Call
  const submitHandler = async(e) =>{
    e.preventDefault();
    try{
      //yaha laoding true krdi
      dispatch(setLoading(true));
      //backend url called basically api called
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers:{
          "Content-Type": "application/json"
        },
        withCredentials:true,
      });
      if(res.data.success){
        dispatch(setUser(res.data.user));
        //navigate to the home page
        navigate("/");
        toast.success(res.data.message);//msg display hoga
      }
    }catch(error){
      console.log(error);
    }finally {
      dispatch(setLoading(false));
  }
}

  //Agar hm already login hai and fir bhi login me jarahe hai toh yeh nhi hona chahie
   useEffect(()=>{
    if(user){
      navigate("/");
   }
  },[]) 

  return (
    <div>
      <Navbar />
      <div className="mainsignup">
        <form onSubmit={submitHandler} className="formsetup">
          <h1 className="signuplogo">Login</h1>
          
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
                    checked={input.role==='Student'}
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
                    checked={input.role==='Recruiter'}
                    onChange={changeEventHandler}
                    className="cursor-pointer w-4 h-4"  
                  />
                <Label htmlFor="option-two">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {
            loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Login</Button>
          }
         <span classname="text-sm">Don't have an account? <Link to="/Signup" className="text-blue-600">Signup</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Login;

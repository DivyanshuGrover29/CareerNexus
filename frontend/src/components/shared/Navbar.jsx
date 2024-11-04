import React, { useEffect, useState } from "react";
import "/src/App.css";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { LogOut, Moon, Sun, User2, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";

const Navbar = () => {
  //const user = false; //Isee kya hoga false case me popover ni dikhege remaining button dikhege signup and login

  //calling from redux
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  //for logout the profile
  const logoutHandler = async () => {
    try {
      //Api call process
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/"); //navigate to home page
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="logo-name">
      <div className="navb">
        <div>
          <h1 className="logo-name1">
            Career<span className="logo-namespan">Nexus</span>
          </h1>
        </div>
        <div className="nav-right">
          <ul className="list-name">
            {user && user.role === "Recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/Jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/Browse">Browse</Link>
                </li>
                {/* Add the Courses link here */}
                <li>
                  <a href="https://skillsikho-by-careernexus.vercel.app/" target="_blank" rel="noopener noreferrer">
                    Courses
                  </a>
                </li>
              </>
            )}
          </ul>
          {
            //JavaScript code tha islie comment addd hua ese //
            //Ternary operator
            !user ? (
              <div className="loginsignupbutton">
                <Link to="/Login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/Signup">
                  <Button className="bg-[#4a38c2] hover:bg-[#5b30a6]">
                    Signup
                  </Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="avatarimage">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="avatarcontent">
                  <Avatar className="popover-avatar">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4 className="avatardetails">{user?.fullname}</h4>
                    <p className=" text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                  {user && user.role === "Student" && (
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button variant="link">
                        {" "}
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}

                  <div className="buttonpops">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;

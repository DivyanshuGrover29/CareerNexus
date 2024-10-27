import React, { useState } from 'react';
import "/src/App.css";
import { Button } from '../ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const HeroSection = () => {
  const [query , setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/Browse");
  }



  return (
    <div className='herosection'>
       <div className='hero'>
        <span className='herointro'>Your Gateway to Career Success</span>
        <h1 className='heroh1'>Search, Apply & <br/>Get your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
        <p className='herop'>Discover the perfect job match and elevate your career with ease.</p>
        <div className='heroinput'>
            <input 
               type="text"
               placeholder='Find your dream jobs'
               onChange={(e) => setQuery(e.target.value)}
               className='outline-none border-none '
             />
             <Button onClick={searchJobHandler} className='bg-[#6A38C2] rounded-r-full'>
                <Search className='h-5 w-5'/>
             </Button>
        </div>

       </div>
      

    </div>
  )
}

export default HeroSection;
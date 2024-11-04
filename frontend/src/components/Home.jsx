import React, { useEffect } from 'react'
import Navbar from './shared/Navbar';
import HeroSection from './shared/HeroSection';
import CategoryCarousel from './shared/CategoryCarousel';
import LatestJobs from './shared/LatestJobs';
import Footer from './shared/Footer';
import useGetAllJobs from '@/Customhooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Courses from './shared/Courses';

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(()=> {
    if(user?.role === 'Recruiter'){
      navigate("/admin/companies");
    }
  },[]);
  return (
    <div className="min-h-screen bg-gray-50">
        <Navbar/>
        <div className="container mx-auto px-4">
        <HeroSection/>
        <CategoryCarousel/>
        <LatestJobs/>
        <Courses/>
        </div>
        <Footer/>
    </div>
  )
}

export default Home;

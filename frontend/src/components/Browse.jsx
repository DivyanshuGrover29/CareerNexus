import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import JobsCard from './shared/JobsCard';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/Customhooks/useGetAllJobs';

//const randomJobs = [1,2,3,4,5];


const Browse = () => {
  useGetAllJobs();
  const {allJobs} = useSelector(store=>store.job)
  const dispatch = useDispatch();
   
  //side effect handle krne ke lie use hota useEffect
  //and clean krne ke lie hmneew yeh likha
  useEffect(()=>{
    return ()=>{
        dispatch(setSearchedQuery(""));//jab browse page ko leave kro toh result 0 hojana chahie
    }
},[])

  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto my-9'>
          <h1 className='font-bold text-xl my-8'>Search Results ({allJobs.length})</h1>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-2'>
          {
              allJobs.map((job) => {
              return(
                <JobsCard key={job._id} job={job}/>
              )
            })
          }
          </div>
        </div>
    </div>
  )
}

export default Browse;
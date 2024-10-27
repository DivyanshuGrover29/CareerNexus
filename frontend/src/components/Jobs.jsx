import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./shared/FilterCard";
import JobsCard from "./shared/JobsCard";
import { useSelector } from "react-redux";
import { all } from "axios";
import { motion } from "framer-motion";

//const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  const { allJobs , searchedQuery} = useSelector(store=>store.job);
  const [filterJobs , setFilterJobs] = useState(allJobs);
  

  useEffect(()=> {
    if(searchedQuery){
         const filteredJobs = allJobs.filter((job) => {
          return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          //kyu ki salary ek number tha and toLowerCase is supported by string only
          job.salary.toString().toLowerCase().includes(searchedQuery.toLowerCase()); // Updated line
         })
         setFilterJobs(filteredJobs)   
    }
    else{
      setFilterJobs(allJobs);//Isme kuch bhi search ni kra means all jobs show krdi
    }
  },[allJobs , searchedQuery]);//kab kab hoan chahie jab jab search ho ya all jobs ho


  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-7 px-2">
      {/* Responsive layout for mobile and desktop */}
        <div className="flex flex-col md:flex-row gap-5">
          <div className="md:w-1/5 w-full">
             {/*Filter Page */}
             <FilterCard />
          </div>
        {/* Job card*/}
        {
            filterJobs.length <= 0 ? <span>Job not found</span>: (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {
                filterJobs.map((job) => ( 
                  <motion.div
                     initial={{ opacity: 0, x: 100 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -100 }}
                     transition={{ duration: 0.3 }}
                     key={job?._id}>
                    <JobsCard job={job}/>
                    
                  </motion.div>
                ))
              }
        </div>
      </div>
          )
        }
     </div>
    </div>
    </div>
  );
};

export default Jobs;

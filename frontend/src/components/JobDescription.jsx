import React, { useEffect , useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { JOB_API_END_POINT , APPLICATION_API_END_POINT} from '@/utils/constant'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setSingleJob } from '@/redux/jobSlice'
import { toast } from 'sonner'

const JobDescription = () => {
    const {singleJob} = useSelector(store=>store.job);
    const {user} = useSelector(store=>store.auth);
    //iska mtlb application me jo applicant hai uski id === user id se match kr gai iska mltb apply kia hai vrna false hojaega
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    
    //Implement apply job feature- pata hclega job apply hai ya ni 
    const applyJobHandler = async () => {
      try {
          const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
          
          if(res.data.success){
              setIsApplied(true); // Update the local state mtlb apply krdi hai
              //we have made updatedSingleJob because isse kya hota hai jo details already chhaie vo thodi change krni hai bs application change krni hai vo kri
              const updatedSingleJob = {...singleJob, applications:[...singleJob.applications, {applicant:user?._id}]}//only applicant change hue
              dispatch(setSingleJob(updatedSingleJob)); // dispatch helps us to real time UI update
              toast.success(res.data.message);

          }
      } catch (error) {
          console.log(error);
          toast.error(error.response.data.message);
      }
  }


    useEffect(()=>{
      const fetchSingleJob = async () => {
          try {
              const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
              if(res.data.success){
                  dispatch(setSingleJob(res.data.job));
                  setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
              } catch (error) {
              console.log(error);
          }
      }
      fetchSingleJob(); 
  },[jobId,dispatch , user?._id]);



  return (
    <div className='max-w-7xl mx-auto my-12'>
        <div className='flex items-center justify-between'>
            <div>
              <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
              <div className="flex items-center gap-2 mt-5 cursor-pointer">
               <Badge variant="ghost" className={'font-bold text-blue-700 mb-4'}>{singleJob?.position} positions</Badge>
               <Badge variant="ghost" className={'font-bold text-[#F83002] mb-4'}>{singleJob?.jobType}</Badge>
               <Badge variant="ghost" className={'font-bold text-[purple] mb-4'}>{singleJob?.salary}LPA</Badge>
              </div>
            </div>
            <Button
             onClick={isApplied ? null : applyJobHandler}
              disabled = {isApplied} className={`rounded-lg $(isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]')`}>
              {isApplied ? 'Already Applied'  : 'Apply now'}
            </Button> 
        </div>
        <h1 className='border-b-2 border-b-gray-300 font-bold text-lg py-4'>Job Description</h1>
        <div>
            <h1 className='font-bold my-1'>Role:<span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
            <h1 className='font-bold my-1'>Location:<span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
            <h1 className='font-bold my-1'>Description:<span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
            <h1 className='font-bold my-1'>Experience:<span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel} years</span></h1>
            <h1 className='font-bold my-1'>Salary:<span className='pl-4 font-normal text-gray-800'>{singleJob?.salary} LPA</span></h1>
            <h1 className='font-bold my-1'>Total Applicants:<span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
            <h1 className='font-bold my-1'>Posted Date:<span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
            
        </div>
    </div>

  )
}

export default JobDescription;
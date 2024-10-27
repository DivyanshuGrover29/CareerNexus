import React from 'react'
import { Button } from '../ui/button'
import { Bookmark } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Avatar, AvatarImage } from '../ui/avatar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { setCompanies } from '@/redux/companySlice'
import { useParams } from 'react-router-dom'

const JobsCard = ({job}) => {
  const navigate = useNavigate();
//  const jobId = "abcd";
   const params = useParams();
   const jobId = params.id;

  //For created time of job
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference/(1000*24*60*60));//day time written
}

// Example of fetching companies
const fetchCompanies = () => async (dispatch) => {
  try {
    const response = await axios.put(`${COMPANY_API_END_POINT}/update/${jobid}`,{withCredentials:true});
    dispatch(setCompanies(response.data.companies));
  } catch (error) {
    console.error('Failed to fetch companies:', error);
  }
};


return ( 
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 '>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-600'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
        <Button variant="outline" className='rounded-full' size="icon"><Bookmark/></Button>
      </div>
      
      <div className='flex items-center gap-2 my-2'>
         <Button className="p-6" variant="outline" size="icon">
            <Avatar>
              <AvatarImage src={job?.company?.logo} />
            </Avatar>
         </Button>
        <div>
         <h1 className='font-bold text-lg'>{job?.company?.name}</h1>
         <p className='text-sm text-gray-600'>India</p>
        </div>
      </div>
     
        <div>
           <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
           <p className='text-sm text-gray-700'>{job?.description}</p>
        </div>
        <div className="flex items-center gap-2 mt-5 cursor-pointer">
           <Badge variant="ghost" className={'font-bold text-blue-700 mb-4'}>{job?.position} Positions</Badge>
           <Badge variant="ghost" className={'font-bold text-[#F83002] mb-4'}>{job?.jobType}</Badge>
           <Badge variant="ghost" className={'font-bold text-[purple] mb-4'}>{job?.salary}LPA</Badge>
        </div>
        <div className='flex items-center gap-4 mt-1'>
            <Button onClick={()=>navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
            <Button className='bg-[#7209b7]'>Save For Later</Button>
        </div>     
   </div>
    
  )
}

export default JobsCard
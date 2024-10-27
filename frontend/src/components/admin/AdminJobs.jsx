import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '@/Customhooks/useGetAllAdminJobs';
import { setSearchJobByText } from '@/redux/jobSlice';

const AdminJobs = () => {
    useGetAllAdminJobs();
    const [input , setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
   
    //har input or key press pe change ho or real time update ho filter time pr
    useEffect(() => {
       dispatch(setSearchJobByText(input));
    },[input]);

  return (
    <div>
        <Navbar/>
        <div className='max-w-6xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <Input
                 className="w-fit"
                 placeholder="Filter by name,role"
                 onChange={(e) => setInput(e.target.value)}
                 />
                 <Button onClick={() => navigate('/admin/jobs/create')}>New Jobs</Button>
            </div>
            <AdminJobsTable/>
        </div>
    </div>
  )
}

export default AdminJobs;
 
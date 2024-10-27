import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Navbar from './components/shared/Navbar';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/Home';
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';
import Companies from './components/admin/Companies';
import CompaniesCreate from './components/admin/CompaniesCreate';
import CompaniesSetup from './components/admin/CompaniesSetup';
import AdminJobs from './components/admin/AdminJobs';
import AdminPostJob from './components/admin/AdminPostJob';
import Applicants from './components/admin/Applicants';
import ProtectedRoute from './components/admin/ProtectedRoute';

//setting up react-router-dom
const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>    
  },
  {
    path:'/Login',
    element:<Login/>
  },
  {
    path:'/Signup',
    element:<Signup/>
  },
  {
    path:'/Jobs',
    element:<Jobs/>
  },
  {
    path:'/Browse',
    element:<Browse/>
  },
  {
    path:'/description/:id',
    element:<JobDescription/>
  },
  {
    path:'/Profile',
    element:<Profile/>
  },
  //admin ke liye yaha se start krege
  {
    path: "/admin/companies",
    element:<ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path: "/admin/companies/create",
    element:<ProtectedRoute><CompaniesCreate/></ProtectedRoute>
  },
  {
    path: "/admin/companies/:id",
    element:<ProtectedRoute><CompaniesSetup/></ProtectedRoute>
  },
  {
    path: "/admin/jobs",
    element:<ProtectedRoute><AdminJobs/></ProtectedRoute>
  },
  {
    path: "/admin/jobs/create",
    element:<ProtectedRoute><AdminPostJob/></ProtectedRoute>
  },
  {
    path: "/admin/jobs/:id/applicants",
    element:<ProtectedRoute><Applicants/></ProtectedRoute>
  }
])



const App=()=> {
  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
};

export default App;

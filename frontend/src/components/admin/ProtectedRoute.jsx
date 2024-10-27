//This is ver important file to protect the route koi bhi user direct route pe jakar admin pe na ja ske islie
//This is he code of protected route
import react, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const {user} = useSelector((store)=>store.auth);

    const navigate = useNavigate();

    useEffect(() => {
        if(user && user.role !== 'Recruiter'){
            navigate("/");
        }
    },[user, navigate]);

    return (
        <>
        {children}
        </>
    )
};
export default ProtectedRoute;
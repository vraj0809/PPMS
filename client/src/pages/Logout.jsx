import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";
export const Logout = () => {
    const {logoutuser} = useAuth()
   useEffect(() => {
     logoutuser()
     },[logoutuser])
    return(<>
        <Navigate to = "/login" />
    </>)
}
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../store/auth"
import { useEffect } from "react"

export const Admin = () => {
    const navigate = useNavigate()
    const {user} = useAuth()
    useEffect(() => {
        if (user && user?.role != "admin") {
            const timer = setTimeout(() => {
                navigate("/");
            }, 3000);
            return () => clearTimeout(timer); // cleanup if component unmounts
        }
    }, [user, navigate]);

    if (!user) return <p>Loading...</p>;

    if (user?.role != "admin") {
        return <h1>You are not admin. Redirecting in 3 seconds...</h1>;
    }
    return (
        <>
        
        <header>
            <nav>
                <ul>
                    <li><NavLink to="/admin/users">users </NavLink></li>
                    <li><NavLink to="/admin/contacts">contacts</NavLink></li>
                    <li><NavLink to="/service">services</NavLink></li>
                    <li><NavLink>home</NavLink></li>
                </ul>
            </nav>
        </header>
        <Outlet/>
        </>
    )
}
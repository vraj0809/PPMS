import { useState } from "react";
import { useAuth } from "../store/auth"; 
export const Contact = () => {

    const [main,setMain] = useState({
        username:"",
        email:"",
        message:"",
    });
    const [userData,setUserData] = useState(true)
    const {user} = useAuth()
    if(userData && user){
        setMain({
            username:user.username,
            email:user.email,
            message:""
        })
        setUserData(false)
    }
    const handlesubmit = async(e) => {
        e.preventDefault();
        console.log(main);
        setMain({
        username:"",
        email:"",
        message:"",
        })
        try {
            const response = await fetch("http://localhost:5000/api/contact", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(main),
            });
            
            const data = await response.json();
            
            if (response.ok) {
                setMain({
                    username:"",
                    email:"",
                    message:"",
                    })
                alert("message send sucessfully")
            } 
            
          // console.log(response)
          // Reset form
          
          } catch (error) {
              console.log("login", error)
          }
    }

    const handlechange = (e) => {
        
        const name = e.target.name;
        const value = e.target.value;
        setMain((prev) => {
            return{
                ...prev,[name]:value
            }
        })
        // console.log(main)
    }

    // const handleaction = (formData) => {
    //     const submitdata = Object.fromEntries(formData.entries());
    //     console.log(submitdata);
    // }

return(
    
     <form onSubmit={handlesubmit}>
        <div>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" placeholder="Enter username" onChange={handlechange} value={main.username} required  autoComplete="off"/>
        </div>
        <div>
        <label htmlFor="email">email</label>
        <input type="email" id="email" name="email" placeholder="Enter email" onChange={handlechange} value={main.email} required  autoComplete="off"/>
        </div>
        <div>
        <label htmlFor="message">Message</label>
        <input type="textarea" id="message" name="message" placeholder="Enter your message" onChange={handlechange} value={main.message} required  autoComplete="off"/>
        </div>
        <button type="submit">Send</button>
        </form>
    
)}
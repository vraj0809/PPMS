import { useState } from "react";
import {useNavigate} from "react-router-dom"
import { useAuth } from "../store/auth";
import { toast , Bounce} from "react-toastify";
import "../css/login.css"
export const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const {servertoken} = useAuth()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        servertoken(data.token)
        alert("login sucessfull")
        console.log("User login:", data);
        setForm({ email: "",  password: "" });
      
        navigate("/")
        toast.success(data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
      } else {
      toast.error(data.message || "Login failed ❌", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      }
      
    // console.log(response)
    // Reset form
    
    } catch (error) {
        console.log("login", error)
    }
    
    // console.log("Login data:", form);
    // Reset form
    setForm({
      email: "",
      password: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="log">
      <h2>Login</h2>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter email"
          required
          autoComplete="username"
        />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter password"
          required
          autoComplete="current-password"
        />
      </div>

      <button type="submit">Login</button>
    </form>
  );
};

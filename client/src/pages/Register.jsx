import { useState } from "react";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import "../css/register.css";

export const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone1: "",
    phone2: "",
    password: "",
    role: "patient",
    specialization: "",
    licenseProof: "",
    center: "",
    age: "",
    blood: "",
    fullname: "",
    gender: ""
  });

  const [selectedRole, setSelectedRole] = useState("admin");
  const { servertoken } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (response.ok) {
        await servertoken(data.token);
        navigate("/");
        setForm({
          username: "",
          email: "",
          phone1: "",
          phone2: "",
          password: "",
          role: "patient",
          specialization: "",
          licenseProof: "",
          center: "",
          age: "",
          blood: "",
          fullname: "",
          gender: ""
        });

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
        toast.error(data.msg);
      }
    } catch (error) {
      console.log("register", error);
    }
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setForm((prev) => ({ ...prev, role }));
  };

  return (
    <div className="reg">
      <div className="role-selection flex gap-4 mb-6">
        {/* <button type="button" onClick={() => handleRoleChange("admin")} className={selectedRole === "admin" ? "active" : ""}>Admin</button> */}
        <button type="button" onClick={() => handleRoleChange("doctor")} className={selectedRole === "doctor" ? "active" : ""}>Doctor</button>
        <button type="button" onClick={() => handleRoleChange("patient")} className={selectedRole === "patient" ? "active" : ""}>Patient</button>
      </div>

      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>

          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" value={form.username} onChange={handleChange} placeholder="Enter username" required />
          </div>

          <div className="form-group">
            <label htmlFor="fullname">Fullname:</label>
            <input type="text" id="fullname" name="fullname" value={form.fullname} onChange={handleChange} placeholder="Enter Fullname" required autoComplete="new-fullname" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter email" required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={form.password} onChange={handleChange} placeholder="Enter password" required />
          </div>

          <div className="form-group">
            <label htmlFor="phone1">Phone:</label>
            <input type="tel" id="phone1" name="phone1" value={form.phone1} onChange={handleChange} placeholder="Enter phone1" required />
          </div>

          <div className="form-group">
            <label htmlFor="phone2">Spare Phone:</label>
            <input type="tel" id="phone2" name="phone2" value={form.phone2} onChange={handleChange} placeholder="Enter phone2" required />
          </div>

          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input type="number" id="age" name="age" value={form.age} onChange={handleChange} placeholder="Enter age" required autoComplete="new-age" />
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <select name="gender" id="gender" value={form.gender} onChange={handleChange} required>
              <option value="">Select a Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="blood">Blood:</label>
            <select name="blood" id="blood" value={form.blood} onChange={handleChange} required>
              <option value="">Select a Blood</option>
              <option value="A+">A+</option>
              <option value="B+">B+</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="center">Center:</label>
            <select name="center" id="center" value={form.center} onChange={handleChange} required>
              <option value="">Select a center</option>
              <option value="ahmedabad">Ahmedabad</option>
              <option value="mumbai">Mumbai</option>
            </select>
          </div>

          {selectedRole === "doctor" && (
            <>
              <div className="form-group">
                <label>Specialization:</label>
                <input type="text" name="specialization" value={form.specialization} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>License Proof:</label>
                <input type="text" name="licenseProof" value={form.licenseProof} onChange={handleChange} required />
              </div>
            </>
          )}

          <div className="form-footer">
            <button type="submit">Register</button>
            <span className="login-link">
              Already have an account? <a href="/login">Login</a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
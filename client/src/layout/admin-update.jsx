import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { useState, useEffect } from "react";
import { toast , Bounce} from "react-toastify";
export const Adminupdate = () => {
  const { Authorizationadmin } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fetch existing user data
  const getdata = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
        method: "GET",
        headers: {
          Authorization: Authorizationadmin,
        },
      });

      const data = await response.json();
      console.log("User data:", data);

      // Pre-fill form with existing values
      setForm({
        username: data.username || "",
        email: data.email || "",
        phone: data.phone || "",
      });

    } catch (error) {
      console.log(error);
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Updating ID:", id);

      const response = await fetch(`http://localhost:5000/api/admin/users/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: Authorizationadmin,
        },
        body: JSON.stringify(form), // send updated form data
      });

      const result = await response.json();
      console.log("Update result:", result);

      if (response.ok) {
        toast.success("update sucessfully", {
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
        navigate("/admin/users")
      }

    } catch (error) {
      console.log(error);
    }
  };

  // Load existing data when component mounts
  useEffect(() => {
    getdata();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Enter username"
          required
        />
      </div>

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
        />
      </div>

      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Enter phone"
          required
        />
      </div>

      <button type="submit">Update</button>
    </form>
  );
};

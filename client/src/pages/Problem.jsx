import React, { useState } from "react";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Problem = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    problem: ""
  });

  // handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // fake API call here or connect with backend
    console.log("Submitted Data:", formData);

    // show toast
    toast.success("Your problem has been submitted!", {
      position: "top-center",
      autoClose: 2000,
      transition: Bounce,
    });

    // reset form after submit
    setFormData({
      name: "",
      age: "",
      email: "",
      phone: "",
      problem: ""
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Share Your Problem</h2>

      <div>
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          name="age"
          placeholder="Enter your age"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="problem">Your Problem</label>
        <input
          type="text"
          id="problem"
          name="problem"
          placeholder="Describe your problem"
          value={formData.problem}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Problem;

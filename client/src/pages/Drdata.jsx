import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";

export const Drdata = () => {
  const { Authorizationadmin, user } = useAuth();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const getAllUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/patient/doctor", {
        method: "GET",
        headers: { Authorization: Authorizationadmin },
      });
      const data = await response.json();
      if (Array.isArray(data)) setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteruser = users.filter((dr) => {
    return (
      dr.username?.toLowerCase().includes(search.toLowerCase()) ||
      dr.center?.toLowerCase().includes(search.toLowerCase())
    );
  });

  useEffect(() => {
    getAllUsers();
  }, []);

  if (user?.submit === true) {
    return (
      <div className="submitted-message">
        <h1>You submitted your form. Wait for doctor approval.</h1>
        {user?.allocate && <p>✅ Approved by doctor!</p>}
      </div>
    );
  }

  return (
    <div>
      <label htmlFor="search">Search</label>
      <input
        type="text"
        id="search"
        name="search"
        value={search}
        onChange={handleChange}
        placeholder="Enter search"
      />

      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Center</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteruser.map((curUser, index) => (
            <tr key={index}>
              <td>{curUser.username}</td>
              <td>{curUser.center}</td>
              <td>
                <Link to={`/doctorsforpatient/drdata/${curUser._id}`}>
                  Fill Form
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

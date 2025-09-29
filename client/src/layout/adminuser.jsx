import { useEffect, useState } from "react"
import { useAuth } from "../store/auth"
import {Link} from "react-router-dom"
export const Adminuser = () => {
    const {Authorizationadmin} = useAuth()
    const [users, setUsers] = useState([
  {
    _id: "",
    username: "",
    email: "",
    phone1: "",
    role: "",
    specialization: "",
    center: "",
    fullname: "",
    blood: "",
    age: null,
    gender: "",
    submit: false,
    allocate: false
  }
])

    const getallusers = async() => {
        try {
            const responce = await fetch("http://localhost:5000/api/admin/users",{
                method:"GET",
                headers:{
                    Authorization : Authorizationadmin
                }
            })
            const data = await responce.json()
            setUsers(data.users)
            console.log(users)
        } catch (error) {
            console.log(error)
        }
    }
    const deleteuser = async(id) => {
        
        try {
            console.log(id);
            const responce = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`,{
                method:"DELETE",
                headers:{
                    Authorization : Authorizationadmin
                }
            })
            const data = await responce.json()
            console.log("after delete" , data)
            if (responce.ok){
                getallusers()
            }
            // setUsers(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getallusers()
    },[])
    return (
        <>
        <table border="1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((curUser, index) => {
                        return (
                            <tr key={index}>
                                <td>{curUser.username}</td>
                                <td>{curUser.email}</td>
                                <td>{curUser.phone1}</td>
                                <td>
                                    <Link to={`/admin/user/${curUser._id}/edit`} >Edit</Link>
                                    </td>
                                <td><button onClick={() => deleteuser(curUser._id)}>Delete </button></td>
                            </tr>
                        )
                    })}
                </tbody>
        </table>

        </>
    )
}

// import { useEffect, useState } from "react";
// import { useAuth } from "../store/auth";
// import { Link } from "react-router-dom";

// export const Adminuser = () => {
//   const { Authorizationadmin } = useAuth();
//   const [users, setUsers] = useState([]); // start with empty array
//   const [loading, setLoading] = useState(true);

//   // Fetch all users
//   const getallusers = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("http://localhost:5000/api/admin/users", {
//         method: "GET",
//         headers: {
//           Authorization: Authorizationadmin, // Bearer token from context
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         console.error(`Failed to fetch users. Status: ${response.status}`);
//         setUsers([]);
//         setLoading(false);
//         return;
//       }

//       const data = await response.json();

//       if (!data.users || !Array.isArray(data.users)) {
//         console.warn("No users found in API response", data);
//         setUsers([]);
//         setLoading(false);
//         return;
//       }

//       // Fill missing fields to avoid undefined in table
//       const filledUsers = data.users.map((user) => ({
//         _id: user._id || "",
//         username: user.username || "",
//         email: user.email || "",
//         phone1: user.phone1 || "",
//         role: user.role || "",
//         specialization: user.specialization || "",
//         center: user.center || "",
//         fullname: user.fullname || "",
//         blood: user.blood || "",
//         age: user.age || null,
//         gender: user.gender || "",
//         submit: user.submit || false,
//         allocate: user.allocate || false,
//       }));

//       setUsers(filledUsers);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       setUsers([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete a user
//   const deleteuser = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;

//     try {
//       const response = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: Authorizationadmin,
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         console.error(`Failed to delete user. Status: ${response.status}`);
//         return;
//       }

//       const data = await response.json();
//       console.log("After delete:", data);

//       // Refresh user list
//       getallusers();
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//   };

//   useEffect(() => {
//     getallusers();
//   }, []);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Admin Users</h2>

//       {loading ? (
//         <p>Loading users...</p>
//       ) : users.length === 0 ? (
//         <p>No users found.</p>
//       ) : (
//         <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Update</th>
//               <th>Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((curUser) => (
//               <tr key={curUser._id}>
//                 <td>{curUser.username}</td>
//                 <td>{curUser.email}</td>
//                 <td>{curUser.phone1}</td>
//                 <td>
//                   <Link to={`/admin/user/${curUser._id}/edit`}>Edit</Link>
//                 </td>
//                 <td>
//                   <button onClick={() => deleteuser(curUser._id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

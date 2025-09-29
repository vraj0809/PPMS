// // import { NavLink, useNavigate } from "react-router-dom";
// // import { useAuth } from "../store/auth";
// // import "../css/new.css"
// // export const Navbar = () => {
// //   const {loggedin,user} = useAuth()
// //   const navigate = useNavigate()
  
// //   return (
// //     <nav>
// //       <ul style={{ 
// //         listStyle: "none", 
// //         display: "flex", 
// //         gap: "20px", 
// //         padding: "10px", 
// //         background: "#f2f2f2" 
// //       }}>
// //         <li><NavLink to="/">Home</NavLink></li>
// //         <li><NavLink to="about">About</NavLink></li>
// //         <li><NavLink to="contact">Contact</NavLink></li>
// //         <li><NavLink to="service">Service</NavLink></li>
// //         {user?.role === "admin" ? (
// //             <li><NavLink to="/admin">Admin</NavLink></li>
// //           ) : user?.role === "doctor" ? (
// //             <>
// //             <li><NavLink to="/dr">Dr</NavLink></li>
// //             <li><NavLink to="/admin/users">patients</NavLink></li>
// //             </>
// //           ) : null}
// //         {user?.role === "patient" ? (
// //           <>
// //           <li><NavLink to="/Patientsocket">patient</NavLink></li>
// //           <li><NavLink to="/doctorsforpatient">Your Doctor</NavLink></li>
// //           </>
// //         ): null }
// //         {loggedin ? 
// //          (<li><NavLink to="logout">Logout</NavLink></li>)
// //           : (<><li><NavLink to="register">Register</NavLink></li>
// //           <li><NavLink to="login">Login</NavLink></li></>)
// //         }
        
// //       </ul>
// //     </nav>
// //   );
// // };

// import { NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../store/auth";
// import { useState } from "react";
// import "../css/new.css";

// export const Navbar = () => {
//   const { loggedin, user } = useAuth();
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => setIsOpen(!isOpen);
//   const closeMenu = () => setIsOpen(false);

//   // Choose profile image based on gender
//   const getProfileImage = () => {
//     if (user?.gender === "male") {
//       return "/icons8-account-male-100.png";
//     } else if (user?.gender === "female") {
//       return "/icons8-person-100.png";
//     } else {
//       return "/icons8-account-male-100.png";
//     }
//   };

//   return (
//     <nav className="navbar">
//       {/* Logo */}
//       <div className="navbar-logo">
//         <img
//           src="/AyurSutraFinal.png"
//           alt="App Logo"
//           className="logo"
//           onClick={() => navigate("/")}
//         />
//       </div>

//       {/* Profile + Hamburger (mobile) */}
//       <div className="navbar-right">
//         {loggedin && (
//           <div className="profile-image">
//             <img src={getProfileImage()} alt="Profile" />
//           </div>
//         )}
//         <div
//           className={`menu-toggle ${isOpen ? "open" : ""}`}
//           onClick={toggleMenu}
//         >
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>
//       </div>

//       {/* Navigation Links */}
//       <ul className={isOpen ? "show" : ""}>
//         <li>
//           <NavLink to="/" onClick={closeMenu}>Home</NavLink>
//         </li>
//         <li>
//           <NavLink to="/about" onClick={closeMenu}>About</NavLink>
//         </li>
//         {/* <li>
//           <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
//         </li> */}
//         {/* <li>
//           <NavLink to="/service" onClick={closeMenu}>Service</NavLink>
//         </li> */}

//         {user?.role === "admin" && (
//           <li>
//             <NavLink to="/admin" onClick={closeMenu}>Admin</NavLink>
//           </li>
//         )}

//         {user?.role === "doctor" && (
//           <>
//             <li>
//               <NavLink to="/drapprove" onClick={closeMenu}>Dr</NavLink>
//             </li>
//             {/* <li>
//               <NavLink to="/admin/users" onClick={closeMenu}>Patients</NavLink>
//             </li> */}
//             <li>
//               <NavLink to="/view" onClick={closeMenu}>Patients</NavLink>
//             </li>
//           </>
//         )}

//         {user?.role === "patient" && (
//           <>
//             {/* <li>
//               <NavLink to="/Patientsocket" onClick={closeMenu}>Patient</NavLink>
//             </li> */}
//             <li>
//               <NavLink to="/doctorsforpatient" onClick={closeMenu}>Your Doctor</NavLink>
//             </li>
//             <li>
//               <NavLink to="/problem" onClick={closeMenu}>Feedback</NavLink>
//             </li>
//             <li>
//               <NavLink to="/Patientdash" onClick={closeMenu}>Visualization</NavLink>
//             </li>
//           </>
//         )}

//         {loggedin ? (
//           <li>
//             <NavLink to="/logout" onClick={closeMenu}>Logout</NavLink>
//           </li>
//         ) : (
//           <>
//             <li>
//               <NavLink to="/register" onClick={closeMenu}>Register</NavLink>
//             </li>
//             <li>
//               <NavLink to="/login" onClick={closeMenu}>Login</NavLink>
//             </li>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// };

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { useState } from "react";
import "../css/new.css";

export const Navbar = () => {
  const { loggedin, user } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const getProfileImage = () => {
    if (user?.gender === "male") {
      return "/icons8-account-male-100.png";
    } else if (user?.gender === "female") {
      return "/icons8-person-100.png";
    } else {
      return "/icons8-account-male-100.png";
    }
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <img
          src="/AyurSutraFinal.png"
          alt="App Logo"
          className="logo"
          onClick={() => navigate("/")}
        />
      </div>

      {/* Right side: Links + Profile + Hamburger */}
      <div className="navbar-right">
        <ul className={isOpen ? "show" : ""}>
          <li><NavLink to="/" onClick={closeMenu}>Home</NavLink></li>
          {/* <li><NavLink to="/about" onClick={closeMenu}>About</NavLink></li> */}
          {/* <li><NavLink to="/contact" onClick={closeMenu}>Contact</NavLink></li> */}

          {user?.role === "admin" && (
            <li><NavLink to="/admin" onClick={closeMenu}>Admin</NavLink></li>
          )}

          {user?.role === "doctor" && (
            <>
              <li><NavLink to="/drapprove" onClick={closeMenu}>Approvals</NavLink></li>
              <li><NavLink to="/view" onClick={closeMenu}>Patients</NavLink></li>
            </>
          )}

          {user?.role === "patient" && (
            <>
              <li><NavLink to="/doctorsforpatient" onClick={closeMenu}>Your Doctor</NavLink></li>
              <li><NavLink to="/problem" onClick={closeMenu}>Feedback</NavLink></li>
              <li><NavLink to="/Patientdash" onClick={closeMenu}>Visualization</NavLink></li>
              
               <li><NavLink to="/schedulereq" onClick={closeMenu}>Time Schedule</NavLink></li>
            </>
          )}

          {loggedin ? (
            <li><NavLink to="/logout" onClick={closeMenu}>Logout</NavLink></li>
          ) : (
            <>
              <li><NavLink to="/register" onClick={closeMenu}>Register</NavLink></li>
              <li><NavLink to="/login" onClick={closeMenu}>Login</NavLink></li>
            </>
          )}
        </ul>

        {loggedin && (
          <div className="profile-image">
            <img src={getProfileImage()} alt="Profile" />
          </div>
        )}

        <div
          className={`menu-toggle ${isOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};
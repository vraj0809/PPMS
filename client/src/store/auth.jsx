import { createContext, useContext, useEffect, useState } from "react";

export const Authcontext = createContext();

export const Authprovider = ({ children }) => {
  // ✅ Use sessionStorage instead of localStorage
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [userrname, setUserrname] = useState("");
  const Authorizationadmin = `Bearer ${token}`;

  // ✅ Save token in sessionStorage (tab-specific)
  const servertoken = (servert) => {
    setToken(servert);
    sessionStorage.setItem("token", servert);
  };

  const logoutuser = () => {
    setToken("");
    setUser(null);
    setUserrname("");
    sessionStorage.removeItem("token");
  };

  const loggedin = !!token;

  const Authentication = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("user data", data.userData);
        setUser(data.userData);
        setUserrname(data.userData.username);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      Authentication();
    }
  }, [token]);
 
  return (
    <Authcontext.Provider
      value={{
        loggedin,
        servertoken,
        logoutuser,
        user,
        userrname,
        Authorizationadmin,
      }}
    >
      {children}
    </Authcontext.Provider>
  );
};

export const useAuth = () => {
  return useContext(Authcontext);
};

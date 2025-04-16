import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

const AuthContextWrapper = ({ children }) => {
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    authenticateAdmin();
  }, []);

  const authenticateAdmin = async () => {
    const tokenFromLocalStorage = localStorage.getItem("authToken");
    if (!tokenFromLocalStorage) {
      setCurrentAdmin(null);
      setIsLoading(false);
      setLoggedIn(false);
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/verify`,
        {
          headers: {
            authorization: `Bearer ${tokenFromLocalStorage}`,
          },
        }
      );

      setCurrentAdmin(response.data.payload);
      setIsLoading(false);
      setLoggedIn(true);
    } catch (error) {
      console.log(error);
      setCurrentAdmin(null);
      setIsLoading(false);
      setLoggedIn(false);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("authToken");
    nav("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        currentAdmin,
        isLoading,
        isLoggedIn,
        handleLogout,
        authenticateAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextWrapper };

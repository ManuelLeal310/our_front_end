import axios from "axios";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const AuthContext = createContext();

const AuthContextWrapper = ({ children }) => {
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const nav = useNavigate();

  const authenticateAdmin = async () => {
    const tokenFromLocalStorage = localStorage.getItem("authToken");
    if (!tokenFromLocalStorage) {
      setCurrentAdmin(null);
      setIsLoading(false);
      setLoggedIn(false);
    } else {
      try {
        const responseFromVerifyRoute = await axios.get(
          `${import.meta.env.Vite_API_URL}/admin/verify`,
          {
            headers: {
              authorization: `Bearer ${tokenFromLocalStorage}`,
            },
          }
        );
        console.log("athenticate user function", responseFromVerifyRoute);
        setCurrentAdmin(responseFromVerifyRoute.data.payload);
        setIsLoading(false);
        setLoggedIn(true);
      } catch (error) {
        console.log(error);
        setCurrentAdmin(null);
        setIsLoading(false);
        setLoggedIn(false);
      }
    }
  };
  useEffect(() => {
    authenticateAdmin();
  }, []);
  async function handleLogout() {
    localStorage.removeItem("authToken");
    await authenticateUser();
    nav("/login");
  }
  return (
    <AuthContext.Provider
      value={{
        currentAdmin,
        isLoading,
        isLoggedIn,
        authenticateAdmin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextWrapper };

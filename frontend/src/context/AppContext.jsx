import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null); // Fixed: Should be `null`
  const [verified, setVerified] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Set axios default once globally
  axios.defaults.withCredentials = true;

  const isAuthState = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/is-auth`);

      if (data.success) {
        setIsLoggedIn(true);
        getUserData(); // Fetch user details if authenticated
      } else {
        setIsLoggedIn(false);
        setUserData(null);
      }
    } catch (error) {
      console.error("Auth Check Error:", error);
      toast.error(
        error.response?.data?.message || "Authentication check failed."
      );
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/get-user`);

      if (data.success) {
        setUserData(data);
        setName(data.name);
        setEmail(data.email);
        setVerified(data.isAccountVerified);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("User Data Fetch Error:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch user data."
      );
    }
  };

  // Fetch authentication state on mount
  useEffect(() => {
    isAuthState();
  }, []);

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
    name,
    email,
    isAuthState,
    verified,
    setVerified,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

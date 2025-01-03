import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(false);
  const [verified, setVerified] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const isAuthState = async () => {
    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios.get(`${backendUrl}/is-auth`);

      if (data.success) {
        setIsLoggedIn(true);
        setUserData(true);
        getUserData();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getUserData = async () => {
    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios.get(`${backendUrl}/get-user`);

      if (data.success) {
        setUserData(true);
        setName(data.name);
        setEmail(data.email);
        setVerified(data.isAccountVerified);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  isAuthState();

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

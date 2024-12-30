import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AppConetext = createContext();

export const AppConetextProvider = ({ children }) => {
  axios.defaults.withCredentials = true;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState();
  const [displayUser, setDisplayUser] = useState([]);

  const getUserData = async () => {
    try {
      const data = await axios.get(`${backendUrl}/get-user`);

      setDisplayUser(data.data.userData);
      data.success
        ? setUserData(data.data.userData)
        : toast.error(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
    displayUser,
  };

  return <AppConetext.Provider value={value}>{children}</AppConetext.Provider>;
};

import axios from "axios";
import { useContext, useState } from "react";
import { FaRegCircleXmark } from "react-icons/fa6";
import { HiArrowLongRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import boy_logo from "../assets/boy.png";
import logo from "../assets/logo.png";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const {
    isLoggedIn,
    name,
    backendUrl,
    setIsLoggedIn,

    setUserData,
    verified,
  } = useContext(AppContext);

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(`${backendUrl}/logout`);

      if (data.success) {
        setIsLoggedIn(false);
        setUserData(false);

        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/send-verify-otp`);

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <header>
      <nav className="flex justify-between items-center px-4 py-3 md:px-40">
        <Link to="/" className="flex items-center gap-4">
          <img className="w-[50px]" src={logo} alt="logo" />{" "}
          <span className="hidden text-lg font-medium  md:block ">
            Authentication{" "}
          </span>
        </Link>
        {isLoggedIn ? (
          <>
            <div className="flex items-center gap-3 relative">
              <span className=" text-[17px] hidden md:block font-semibold">
                Hi, {name}
              </span>
              <img
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-[40px] cursor-pointer border-[1.5px] border-sky-500 rounded-full p-[1px]"
                src={boy_logo}
                alt="logo"
              />
              {showProfileMenu && (
                <div className="w-[200px] absolute top-14 right-0  border-[1.3px] rounded-md border-slate-200">
                  <ul className="flex flex-col gap-2 p-6 relative">
                    <li className="mb-1">
                      <Link
                        to="/profile"
                        className="border-b-[1.3px] border-slate-200 w-full block leading-9"
                      >
                        Profile
                      </Link>
                    </li>
                    {verified ? (
                      ""
                    ) : (
                      <li className="mb-1">
                        <Link
                          to="/email-verification"
                          className="border-b-[1.3px] border-slate-200 w-full block leading-9"
                          onClick={sendVerificationOtp}
                        >
                          Verify Email
                        </Link>
                      </li>
                    )}
                    <li>
                      <Link to="/" onClick={logout}>
                        Logout
                      </Link>
                    </li>
                    <FaRegCircleXmark
                      className="absolute right-[-2px] top-[-1px] text-xl text-slate-500 cursor-pointer"
                      onClick={() => setShowProfileMenu(!showProfileMenu)}
                    />
                  </ul>
                </div>
              )}
            </div>
          </>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-2 border-[1px] border-gray-500 rounded-full  px-[15px] py-[5px] hover:bg-slate-100 transition-colors duration-100"
          >
            <span className="text-[15px]">Login</span> <HiArrowLongRight />
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

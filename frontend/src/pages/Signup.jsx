import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiLock } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);
  const navigate = useNavigate();

  // Password validation function
  const isValidPassword = (password) => {
    return password.length >= 6; // Can be extended with regex for complexity
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!isValidPassword(password)) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/signup`,
        { name, email, password },
        { withCredentials: true }
      );

      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <section className="mt-14 flex justify-center">
      <div className="max-w-[350px] w-full border-[1.3px] rounded-md border-slate-200 px-4 py-5 mx-4 md:mx-0">
        <h1 className="text-xl font-semibold text-black text-center">
          Signup for an account
        </h1>
        <form onSubmit={onSubmitHandler}>
          <div className="flex items-center gap-2 mt-3 border-[1.3px] rounded-md border-slate-200 py-2 px-2">
            <FiUser className="text-xl" />
            <input
              className="w-full h-full outline-none border-none bg-none"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center gap-2 mt-3 border-[1.3px] rounded-md border-slate-200 py-2 px-2">
            <HiOutlineMail className="text-xl" />
            <input
              className="w-full h-full outline-none border-none bg-none"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center gap-2 mt-3 border-[1.3px] rounded-md border-slate-200 py-2 px-2">
            <FiLock className="text-xl" />
            <input
              className="w-full h-full outline-none border-none bg-none"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="w-full border-[1.3px] rounded-md border-slate-200 py-[6px] text-gray-700 mt-5"
            type="submit"
          >
            Signup
          </button>
          <span className="text-center block mt-[10px] text-gray-700">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Login
            </Link>
          </span>
        </form>
      </div>
    </section>
  );
};

export default Signup;

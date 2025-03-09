import axios from "axios";
import React, { useContext, useState } from "react";
import { FiLock } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);

  // Email validation regex
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Prevent empty input submission
    if (!email.trim() || !password.trim()) {
      return toast.error("Both email and password are required.");
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return toast.error("Please enter a valid email address.");
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/login`,
        { email, password },
        { withCredentials: true } // Keep withCredentials here for the request
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
      toast.error(error.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <section className="mt-14 flex justify-center">
      <div className="max-w-[350px] w-full border-[1.3px] rounded-md border-slate-200 px-4 py-5 mx-4 md:mx-0">
        <h1 className="text-xl font-semibold text-black text-center">
          Login to your account
        </h1>
        <form onSubmit={onSubmitHandler}>
          {/* Email Input */}
          <div className="flex items-center gap-2 mt-3 border-[1.3px] rounded-md border-slate-200 py-2 px-2">
            <HiOutlineMail className="text-xl" />
            <input
              className="w-full h-full outline-none border-none bg-transparent"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="flex items-center gap-2 mt-3 border-[1.3px] rounded-md border-slate-200 py-2 px-2">
            <FiLock className="text-xl" />
            <input
              className="w-full h-full outline-none border-none bg-transparent"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Link
            to="/reset-password"
            className="text-right my-[10px] block text-gray-600 font-normal underline"
          >
            Forgot password?
          </Link>

          {/* Submit Button */}
          <button
            className="w-full border-[1.3px] rounded-md border-slate-200 py-[6px] text-gray-700"
            type="submit"
          >
            Login
          </button>

          <span className="text-center block mt-[10px] text-gray-700">
            Don't have an account?{" "}
            <Link to="/signup" className="underline">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </section>
  );
};

export default Login;

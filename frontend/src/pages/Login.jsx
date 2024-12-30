import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { HiOutlineMail } from "react-icons/hi";
import { FiLock } from "react-icons/fi";
import { AppConetext } from "../context/AppContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppConetext);

  const navigate = useNavigate();

  const onSubmitHalder = async (e) => {
    e.preventDefault();

    axios.defaults.withCredentials = true;

    try {
      const { data } = await axios.post(`${backendUrl}/login`, {
        email,
        password,
      });

      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
        navigate("/");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="mt-14">
      <div className="w-[320px] m-auto border-[1.3px] rounded-md border-slate-200 px-4 py-5 ">
        <h1 className="text-xl font-semibold text-black text-center">
          Login your account
        </h1>
        <form onSubmit={onSubmitHalder}>
          <div className="flex items-center gap-2 mt-3  border-[1.3px] rounded-md border-slate-200 py-2 px-2">
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
          <div className="flex items-center gap-2 mt-3  border-[1.3px] rounded-md border-slate-200 py-2 px-2">
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
          <Link
            to={"/reset-password"}
            className="text-right my-[10px] block text-gray-600 font-normal underline"
          >
            Forgot password?
          </Link>
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

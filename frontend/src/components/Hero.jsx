import React, { useContext } from "react";
import { HiArrowLongRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import robotImage from "../assets/robot.png";
import { AppConetext } from "../context/AppContext";
import { use } from "react";

const Hero = () => {
  const { displayUser } = useContext(AppConetext);

  return (
    <section className="flex justify-center items-center mt-24">
      <div className="flex flex-col items-center">
        <img className="w-[100px] md:w-[120px]" src={robotImage} alt="image" />
        <h2 className="text-2xl font-semibold md:font-bold mt-1 ">
          Hey, <span>{displayUser.name ? displayUser.name : "Developer"}</span>{" "}
          👋
        </h2>
        <h1 className="text-3xl text-center mt-2 font-semibold md:font-bold">
          Welcome to our Authentication App
        </h1>
        <Link
          to="/login"
          className="flex items-center gap-2 border-[1px] border-gray-500 rounded-full  px-[15px] py-[8px] mt-4 hover:bg-slate-100 transition-colors duration-100"
        >
          <span className="text-[15px]">Get Started</span> <HiArrowLongRight />
        </Link>
      </div>
    </section>
  );
};

export default Hero;

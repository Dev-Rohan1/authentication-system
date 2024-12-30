import { HiArrowLongRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <header>
      <nav className="flex justify-between items-center px-4 py-3 md:px-40">
        <Link to="/" className="flex items-center gap-4">
          <img className="w-[50px]" src={logo} alt="logo" />{" "}
          <span className="hidden text-lg font-medium  md:block ">
            Authentication{" "}
          </span>
        </Link>
        <Link
          to="/login"
          className="flex items-center gap-2 border-[1px] border-gray-500 rounded-full  px-[15px] py-[5px] hover:bg-slate-100 transition-colors duration-100"
        >
          <span className="text-[15px]">Login</span> <HiArrowLongRight />
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;

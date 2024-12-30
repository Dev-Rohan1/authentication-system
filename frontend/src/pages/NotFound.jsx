import React from "react";
import NotFoundImage from "../assets/error.png";

const NotFound = () => {
  return (
    <section className="flex items-center justify-center mt-[50px]">
      <div className="flex flex-col items-center">
        <img className="w-[200px]" src={NotFoundImage} alt="image" />
        <h1 className="text-3xl font-semibold md:font-bold mt-3">
          Opps! Page Not Found
        </h1>
      </div>
    </section>
  );
};

export default NotFound;

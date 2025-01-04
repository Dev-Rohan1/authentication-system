import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Profile = () => {
  const { name, email, verified } = useContext(AppContext);

  return (
    <section className="mt-14 flex justify-center">
      <div className="max-w-[350px] w-full border-[1.3px] rounded-md border-slate-200 px-4 py-5 mx-4 md:mx-0">
        <h1 className="text-xl font-semibold text-black text-center">
          your Profile
        </h1>
        <ul className="flex flex-col gap-2 p-6 relative">
          <li className="mb-1 border-b-[1.3px] border-slate-200 w-full block leading-9">
            Name: {name}
          </li>
          <li className="mb-1 border-b-[1.3px] border-slate-200 w-full block leading-9">
            Email: {email}
          </li>
          <li>Account verified : {verified ? "true" : "false"}</li>
        </ul>
      </div>
    </section>
  );
};

export default Profile;

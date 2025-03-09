import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Profile = () => {
  const {
    name = "N/A",
    email = "N/A",
    verified = false,
  } = useContext(AppContext);

  return (
    <section className="mt-14 flex justify-center">
      <div className="max-w-[350px] w-full border-[1.3px] rounded-md border-slate-200 px-4 py-5 mx-4 md:mx-0">
        <h1 className="text-xl font-semibold text-black text-center">
          Your Profile
        </h1>
        <ul className="flex flex-col gap-2 p-6">
          <li className="mb-1 border-b-[1.3px] border-slate-200 w-full leading-9">
            <strong>Name:</strong> {name}
          </li>
          <li className="mb-1 border-b-[1.3px] border-slate-200 w-full leading-9">
            <strong>Email:</strong> {email}
          </li>
          <li>
            <strong>Account Verified:</strong>{" "}
            {verified ? "✅ Verified" : "❌ Not Verified"}
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Profile;

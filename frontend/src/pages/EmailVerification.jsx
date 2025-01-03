import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
  axios.defaults.withCredentials = true;

  const inputRefs = React.useRef([]);

  const { backendUrl, getUserData, isLoggedIn, verified } =
    useContext(AppContext);

  const navigate = useNavigate();

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePast = (e) => {
    const pastedData = e.clipboardData.getData("text");
    const pastArray = pastedData.split("");

    pastArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");

      const { data } = await axios.post(`${backendUrl}/verify-email`, { otp });

      if (data.success) {
        getUserData();
        navigate("/");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    isLoggedIn && verified && navigate("/");
  }, [isLoggedIn, verified]);

  return (
    <section className="mt-14 flex justify-center">
      <div className="max-w-[350px] w-full border-[1.3px] rounded-md border-slate-200 px-4 py-5 mx-4 md:mx-0">
        <h1 className="text-xl font-semibold text-black text-center">
          Email Verification OTP
        </h1>
        <p className="text-center mt-1 mb-2">
          Enter 6-digit code sent to your email id.
        </p>
        <form onSubmit={onSubmitHandler}>
          <div
            className="flex items-center justify-center gap-4 mt-5"
            onPaste={handlePast}
          >
            {Array(6)
              .fill(0)
              .map((_, index) => {
                return (
                  <input
                    className="border-[1.3px] rounded-md border-slate-200 w-[40px] h-[40px] text-center outline-none"
                    type="text"
                    maxLength="1"
                    key={index}
                    ref={(e) => (inputRefs.current[index] = e)}
                    onInput={(e) => handleInput(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                );
              })}
          </div>
          <button
            className="w-full border-[1.3px] rounded-md border-slate-200 py-[7px] text-gray-700 mt-5"
            type="submit"
          >
            Verify Email
          </button>
        </form>
      </div>
    </section>
  );
};

export default EmailVerification;

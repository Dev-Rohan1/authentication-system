import React, { useContext, useEffect, useRef } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
  axios.defaults.withCredentials = true;

  const inputRefs = useRef(Array(6).fill(null)); // Correct use of useRef
  const { backendUrl, getUserData, isLoggedIn, verified } =
    useContext(AppContext);
  const navigate = useNavigate();

  // Handle input and move to next field
  const handleInput = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Only allow numbers
    e.target.value = value; // Ensure only numbers remain

    if (value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Backspace key
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (e.target.value.length === 0 && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else {
        e.target.value = ""; // Clear the current input field
      }
    }
  };

  // Handle Paste event
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, ""); // Get only digits
    if (pastedData.length !== 6) return; // Ensure exactly 6 digits

    // Clear all fields before pasting
    inputRefs.current.forEach((input) => (input.value = ""));

    // Paste the values
    pastedData.split("").forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });

    // Move focus to the last filled input field
    inputRefs.current[Math.min(pastedData.length - 1, 5)]?.focus();
  };

  // Handle form submission
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const otp = inputRefs.current.map((input) => input.value).join("");
      if (otp.length !== 6) {
        return toast.error("Please enter a 6-digit OTP.");
      }

      const { data } = await axios.post(`${backendUrl}/verify-email`, { otp });

      if (data.success) {
        getUserData();
        navigate("/");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed.");
    }
  };

  // Redirect if already verified
  useEffect(() => {
    if (isLoggedIn && verified) {
      navigate("/");
    }
  }, [isLoggedIn, verified, navigate]);

  return (
    <section className="mt-14 flex justify-center">
      <div className="max-w-[350px] w-full border-[1.3px] rounded-md border-slate-200 px-4 py-5 mx-4 md:mx-0">
        <h1 className="text-xl font-semibold text-black text-center">
          Email Verification OTP
        </h1>
        <p className="text-center mt-1 mb-2">
          Enter the 6-digit code sent to your email.
        </p>
        <form onSubmit={onSubmitHandler}>
          <div
            className="flex items-center justify-center gap-4 mt-5"
            onPaste={handlePaste}
          >
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className="border-[1.3px] rounded-md border-slate-200 w-[40px] h-[40px] text-center outline-none"
                  ref={(el) => (inputRefs.current[index] = el)} // Correct use of ref assignment
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
          </div>
          <button
            type="submit"
            className="w-full border-[1.3px] rounded-md border-slate-200 py-[7px] text-gray-700 mt-5"
          >
            Verify Email
          </button>
        </form>
      </div>
    </section>
  );
};

export default EmailVerification;

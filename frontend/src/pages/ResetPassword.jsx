import React, { useContext, useState } from "react";
import { FiLock } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState("");
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const inputRefs = React.useRef([]);

  const { backendUrl } = useContext(AppContext);
  axios.defaults.withCredentials = true;

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

  const sendResetPasswordOtp = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${backendUrl}/send-reset-otp`, {
        email,
      });

      if (data.success) {
        setIsEmailSent(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitOtp = async (e) => {
    e.preventDefault();

    const otpArray = inputRefs.current.map((e) => e.value);
    const otp = otpArray.join("");
    setOtp(otp);
    setIsOtpSubmitted(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${backendUrl}/reset-password`, {
        email,
        otp,
        newPassword,
      });

      if (data.success) {
        navigate("/");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="mt-14 flex justify-center">
      <div className="max-w-[350px] w-full border-[1.3px] rounded-md border-slate-200 px-4 py-5 mx-4 md:mx-0">
        {!isEmailSent && (
          <>
            <h1 className="text-xl font-semibold text-black text-center">
              Reset password
            </h1>
            <p className="text-center mt-1 mb-2">
              Enter your registered email address
            </p>
            <form onSubmit={sendResetPasswordOtp}>
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
              <button
                className="w-full mt-4 border-[1.3px] rounded-md border-slate-200 py-[6px] text-gray-700"
                type="submit"
              >
                Submit
              </button>
            </form>
          </>
        )}

        {isEmailSent && !isOtpSubmitted && (
          <>
            <form onSubmit={onSubmitOtp}>
              <h1 className="text-xl font-semibold text-black text-center">
                Reset password OTP
              </h1>
              <p className="text-center mt-1 mb-2">
                Enter 6-digit code sent to your email id.
              </p>
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
                Submit
              </button>
            </form>
          </>
        )}

        {isEmailSent && isOtpSubmitted && (
          <>
            <form onSubmit={onSubmitNewPassword}>
              <h1 className="text-xl font-semibold text-black text-center">
                Enter new password{" "}
              </h1>

              <div className="flex items-center gap-2 mt-3  border-[1.3px] rounded-md border-slate-200 py-2 px-2">
                <FiLock className="text-xl" />
                <input
                  className="w-full h-full outline-none border-none bg-none"
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <button
                className="w-full mt-4 border-[1.3px] rounded-md border-slate-200 py-[6px] text-gray-700"
                type="submit"
              >
                Submit
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
};

export default ResetPassword;

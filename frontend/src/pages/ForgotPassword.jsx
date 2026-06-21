import React, { useState } from "react";
import { LiaEyeSlashSolid, LiaEyeSolid } from "react-icons/lia";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { serverUrl } from "../App";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [isClicked, setIsClicked] = useState({
    email: false,
    otp: false,
    newPassword: false,
    confirmNewPassword: false,
  });
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  //for step 1 (send OTP)
  const handleStep1 = async () => {
     if (!email.trim()) {
      setErr("Email is required");
      return;
    }
    setErr("")
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/sendOtp`,
        { email },
        { withCredentials: true },
      );

      console.log(result.data);
      if (result.data.success) {
        setStep(2);
      }
      setLoading(false);
    } catch (error) {
      setErr(error?.response?.data?.message);
      console.log(error);
      setLoading(false);
    }
  };

  //for step 2 (verify OTP)
  const handleStep2 = async () => {
     if (!otp.trim()) {
      setErr("OTP is required");
      return;
    }
    setErr("")
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/verifyOtp`,
        { email, otp },
        { withCredentials: true },
      );

      console.log(result.data);
      if (result.data.success) {
        setStep(3);
      }
      setLoading(false);
    } catch (error) {
      setErr(error?.response?.data?.message);
      console.log(error);
      setLoading(false);
    }
  };

  //for step 3 (reset password)
  const handleStep3 = async () => {
     if (!newPassword.trim()) {
      setErr("newPassword is required");
      return;
    }
     if (!confirmNewPassword.trim()) {
      setErr("confirmNewPassword is required");
      return;
    }
    setErr("")
    setLoading(true);
    try {
      if (newPassword !== confirmNewPassword) {
        setErr("password does not match!")
        console.log("password does not match!");
        setLoading(false);
        return;
      }
      const result = await axios.post(
        `${serverUrl}/api/auth/resetPassword`,
        { email, password: newPassword },
        { withCredentials: true },
      );

      if (result.data.success) {
        setNewPassword("");
        setConfirmNewPassword("");
        navigate("/login");
      }

      setLoading(false);
    } catch (error) {
      setErr(error?.response?.data?.message);
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full h-screen 
    bg-gradient-to-b from-black to-gray-700
     flex flex-col justify-center items-center"
    >
      {step == 1 && (
        <div
          className="w-[30%] lg:max-w-[40%] h-[400px] 
        bg-white rounded-2xl border-2 border-[1a1f23] overflow-hidden
        flex flex-col justify-center items-center"
        >
          <h2 className=" font-semibold text-[30px] mb-5">Forgot Password</h2>
          <div
            onClick={() => setIsClicked({ ...isClicked, email: true })}
            className=" relative  flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[20px] border-2 border-black"
          >
            <label
              htmlFor="email"
              className={`text-gray-700 absolute left-[20px] p-[1px] bg-white text-[15px] ${isClicked.email ? "top-[-15px]" : ""}`}
            >
              Enter email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              id="email"
              required
              className="h-[100%] w-[100%] rounded-2xl px-[20px] outline-none border-0"
            />
             {email.length > 0 && email.length <13 && (
              <p
                className={`text-red-700 absolute left-[20px] p-[1px] bg-white text-[12px] top-[34px] `}
              >
                enter a vailid mail
              </p>
            )}
          </div>
          {err && <p className="text-red-600 mt-5 w-[90%] ">{err}</p>}
          <button
            disabled={loading}
            onClick={handleStep1}
            className=" w-[70%] h-[45px] bg-black shadow shadow-white cursor-pointer text-shadow-black font-bold text-white  mt-[40px] rounded-2xl"
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Send OTP"}
          </button>
        </div>
      )}

      {step == 2 && (
        <div
          className="w-[30%] lg:max-w-[40%] h-[400px] 
        bg-white rounded-2xl border-2 border-[1a1f23] overflow-hidden
        flex flex-col justify-center items-center"
        >
          <h2 className=" font-semibold text-[30px] mb-5">OTP Submit</h2>
          <div
            onClick={() => setIsClicked({ ...isClicked, otp: true })}
            className=" relative  flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[20px] border-2 border-black"
          >
            <label
              htmlFor="otp"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${isClicked.otp ? "top-[-15px]" : ""}`}
            >
              Enter OTP
            </label>
            <input
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
              type="text"
              id="otp"
              required
              maxLength={4}
              pattern="[0-9]{4}"
              className="h-[100%] w-[100%] rounded-2xl px-[20px] outline-none border-0"
            />
            {otp.length > 0 && otp.length <4 && (
              <p
                className={`text-red-700 absolute left-[20px] p-[1px] bg-white text-[12px] top-[34px] `}
              >
                otp must be 4 character
              </p>
            )}
          </div>
          {err && <p className="text-red-600 mt-5 w-[90%] ">{err}</p>}
          <button
            disabled={loading}
            onClick={handleStep2}
            className=" w-[70%] h-[45px] bg-black shadow shadow-white cursor-pointer text-shadow-black font-bold text-white  mt-[40px] rounded-2xl"
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Submit"}
          </button>
        </div>
      )}

      {step == 3 && (
        <div
          className="w-[30%] lg:max-w-[40%] h-[400px] 
        bg-white rounded-2xl border-2 border-[1a1f23] overflow-hidden
        flex flex-col justify-center items-center"
        >
          <h2 className=" font-semibold text-[30px] mb-5">Reset Password</h2>
          <div
            onClick={() => setIsClicked({ ...isClicked, newPassword: true })}
            className=" relative  flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[20px] border-2 border-black"
          >
            <label
              htmlFor="newPassword"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${isClicked.newPassword ? "top-[-15px]" : ""}`}
            >
              NewPassword
            </label>
            <input
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              required
              className="h-[100%] w-[100%] rounded-2xl px-[20px] outline-none border-0"
            />
            {newPassword.length > 0 && newPassword.length <6 && (
              <p
                className={`text-red-700 absolute left-[20px] p-[1px] bg-white text-[12px] top-[34px] `}
              >
                newPassword must be 6 character
              </p>
            )}
            {!showNewPassword ? (
              <LiaEyeSolid
                onClick={() => setShowNewPassword(true)}
                className=" absolute cursor-pointer right-[20px] w-[25px] h-[25px]"
              />
            ) : (
              <LiaEyeSlashSolid
                onClick={() => setShowNewPassword(false)}
                className=" absolute cursor-pointer right-[20px] w-[25px] h-[25px]"
              />
            )}
          </div>
          <div
            onClick={() =>
              setIsClicked({ ...isClicked, confirmNewPassword: true })
            }
            className=" relative  flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[20px] border-2 border-black"
          >
            <label
              htmlFor="confirmNewPassword"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${isClicked.confirmNewPassword ? "top-[-15px]" : ""}`}
            >
              ConfirmPassword
            </label>
            <input
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              value={confirmNewPassword}
              type={showConfirmNewPassword ? "text" : "password"}
              id="confirmNewPassword"
              required
              className="h-[100%] w-[100%] rounded-2xl px-[20px] outline-none border-0"
            />
            {confirmNewPassword.length > 0 && confirmNewPassword.length <6 && (
              <p
                className={`text-red-700 absolute left-[20px] p-[1px] bg-white text-[12px] top-[34px] `}
              >
                confirmNewPassword must be 6 character
              </p>
            )}
            {!showConfirmNewPassword ? (
              <LiaEyeSolid
                onClick={() => setShowConfirmNewPassword(true)}
                className=" absolute cursor-pointer right-[20px] w-[25px] h-[25px]"
              />
            ) : (
              <LiaEyeSlashSolid
                onClick={() => setShowConfirmNewPassword(false)}
                className=" absolute cursor-pointer right-[20px] w-[25px] h-[25px]"
              />
            )}
          </div>
          {err && <p className="text-red-600 mt-5 w-[90%] ">{err}</p>}
          <button
            disabled={loading}
            onClick={handleStep3}
            className=" w-[70%] h-[45px] bg-black shadow shadow-white cursor-pointer text-shadow-black font-bold text-white  mt-[40px] rounded-2xl"
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Reset "}
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;

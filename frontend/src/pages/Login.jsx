import React, { useState } from "react";
import logo from "../assets/Vynklogo.png";
import VynkImg from "../assets/Vynk.png";
import vksSign from "../assets/vksSign.png";
import { LiaEyeSolid } from "react-icons/lia";
import { LiaEyeSlashSolid } from "react-icons/lia";
import axios from "axios";
import { serverUrl } from "../App";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isClicked, setIsClicked] = useState({
    username: false,
    password: false,
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/login`,
        { username, password },
        { withCredentials: true },
      );
      console.log(result.data);
      
      //  do empty input field after signUp user
      setUsername("");
      setPassword("");

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full h-screen 
    bg-gradient-to-b from-orange-900 to-gray-900
     flex flex-col justify-center items-center"
    >
      <div
        className="w-[90%] lg:max-w-[60%] h-[600px] 
        bg-white rounded-2xl border-2 border-[1a1f23] overflow-hidden
        flex justify-center items-center"
      >
        <div
          className="w-full lg:w-[50%] h-full bg-white
           flex flex-col justify-center items-center p-[10px] gap[10px]"
        >
          <div className="flex  items-center text-[20px] font-semibold mt-[40px]">
            <span>Login to...</span>
            <img className="w-[140px]" src={logo} alt="" />
          </div>

  
          <div
            onClick={() => setIsClicked({ ...isClicked, username: true })}
            className=" relative  flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[20px] border-2 border-black"
          >
            <label
              htmlFor="username"
              className={`text-gray-700 absolute left-[20px] p-[1px] bg-white text-[15px] ${isClicked.username ? "top-[-15px]" : ""}`}
            >
              Enter username
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              id="username"
              required
              className="h-[100%] w-[100%] rounded-2xl px-[20px] outline-none border-0"
            />
          </div>
          <div
            onClick={() => setIsClicked({ ...isClicked, password: true })}
            className=" relative  flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[30px] border-2 border-black"
          >
            <label
              htmlFor="password"
              className={`text-gray-700 absolute left-[20px] p-[1px] bg-white text-[15px] ${isClicked.password ? "top-[-15px]" : ""}`}
            >
              Enter password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={showPassword ? "text" : "password"}
              id="password"
              required
              className="h-[100%] w-[100%] rounded-2xl px-[20px] outline-none border-0"
            />
            {!showPassword ? (
              <LiaEyeSolid
                onClick={() => setShowPassword(true)}
                className=" absolute cursor-pointer right-[20px] w-[25px] h-[25px]"
              />
            ) : (
              <LiaEyeSlashSolid
                onClick={() => setShowPassword(false)}
                className=" absolute cursor-pointer right-[20px] w-[25px] h-[25px]"
              />
            )}
          </div>

          <div className="w-[90%] px-4 mt-1 underline">
            <p 
            className=" cursor-pointer hover:text-blue-600 w-[40%]"
            onClick={()=>navigate("/forgot-password")}>forgot password?</p>
          </div>

          <button
            onClick={handleSignIn}
            disabled={loading}
            className=" w-[70%] h-[45px] bg-black shadow shadow-white cursor-pointer text-shadow-black font-bold text-white  mt-[40px] rounded-2xl"
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Sign In"}
          </button>
          <p className=" text-gray-800 mt-1">
            Create An Account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className=" cursor-pointer underline text-blue-800 hover:translate-y-2"
            >
              Sign Up
            </span>
          </p>
        </div>
        <div
          className=" relative md:w-[50%] h-full hidden lg:flex justify-center items-center
           bg-[#000000] flex-col text-white text-[16px] 
           font-semibold rounded-l-[30px] shadow-2xl shadow-black"
        >
          <img className="w-[90%]" src={VynkImg} alt="" />
          <img
            className="w-[40%] absolute right-1 bottom-0"
            src={vksSign}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Login;

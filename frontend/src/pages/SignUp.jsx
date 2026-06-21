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

const SignUp = () => {
  const [isClicked, setIsClicked] = useState({
    name: false,
    username: false,
    email: false,
    password: false,
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userExist, setUserExist] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!name.trim()) {
      setErr("Name is required");
      return;
    }

    if (!username.trim()) {
      setErr("Username is required");
      return;
    }

    if (!email.trim()) {
      setErr("Email is required");
      return;
    }

    if (!password.trim()) {
      setErr("Password is required");
      return;
    }

    setErr("");
    setLoading(true);

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { name, username, email, password },
        { withCredentials: true },
      );

      if (!result.data.success) {
        setUserExist(true);
      }

      //  do empty input field after signUp user
      setName("");
      setUsername("");
      setEmail("");
      setPassword("");

      setLoading(false);
    } catch (error) {
      setErr(error.response?.data?.message);
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
           flex flex-col items-center p-[10px] gap[10px]"
        >
          <div className="flex  items-center text-[20px] font-semibold mt-[10px]">
            <span>Sign Up to...</span>
            <img className="w-[140px]" src={logo} alt="" />
          </div>

          <div
            onClick={() => setIsClicked({ ...isClicked, name: true })}
            className=" relative  flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[25px] border-2 border-black"
          >
            <label
              htmlFor="name"
              className={`text-gray-700 absolute left-[20px] p-[1px] bg-white text-[15px] ${isClicked.name ? "top-[-15px] " : ""}`}
            >
              Enter your name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              id="name"
              required
              className="h-[100%] w-[100%] rounded-2xl px-[20px] outline-none border-0"
            />
            {name.length > 0 && name.length < 3 && (
              <p
                className={`text-red-700 absolute left-[20px] p-[1px] bg-white text-[12px] top-[34px] `}
              >
                name must be 3 character
              </p>
            )}
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
            {username.length > 0 && username.length < 6 && (
              <p
                className={`text-red-700 absolute left-[20px] p-[1px] bg-white text-[12px] top-[34px] `}
              >
                username must be 6 character
              </p>
            )}
          </div>

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
            {email.length > 0 && email.length < 13 && (
              <p
                className={`text-red-700 absolute left-[20px] p-[1px] bg-white text-[12px] top-[34px] `}
              >
                enter a vailid email
              </p>
            )}
          </div>
          <div
            onClick={() => setIsClicked({ ...isClicked, password: true })}
            className=" relative  flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[20px] border-2 border-black"
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
            {password.length > 0 && password.length < 6 && (
              <p
                className={`text-red-700 absolute left-[20px] p-[1px] bg-white text-[12px] top-[34px] `}
              >
                password must be 6 character
              </p>
            )}
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

          {userExist && (
            <p
              className={`text-red-700 flex justify-center items-start  p-[1px] bg-white text-[12px]  `}
            >
              user already exist!
            </p>
          )}

          {err && <p className="text-red-600 mt-5 w-[90%] ">{err}</p>}

          <button
            onClick={handleSignUp}
            disabled={loading}
            className=" w-[70%] h-[45px] bg-black shadow shadow-white cursor-pointer text-shadow-black font-bold text-white  mt-[40px] rounded-2xl"
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Sign Up"}
          </button>
          <p className=" text-gray-800 mt-1">
            Already Have An Account?{" "}
            <span
              onClick={() => navigate("/login")}
              className=" cursor-pointer underline text-blue-800 hover:translate-y-2"
            >
              Sign In
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

export default SignUp;

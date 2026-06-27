import React from "react";
import LeftHome from "../components/LeftHome";
import Feed from "../components/Feed";
import RightHome from "../components/RightHome";
import { useSelector } from "react-redux";

function Home() {
  // const { userData } = useSelector((state) => state.user);

  // console.log(userData);
  return (
    <div className="w-full flex justify-center items-center">
      <LeftHome />
      <Feed />
      <RightHome />
    </div>
  );
}

export default Home;

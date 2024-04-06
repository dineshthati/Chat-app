import React from "react";
import Users from "../components/Users";
import { IoSearchSharp } from "react-icons/io5";
import Messages from "../components/Messages";

const Home = () => {
  return (
    <div className="flex justify-center w-full h-full pt-10 relative">
      <div className="left flex flex-col gap-5 border-r-2 p-5  border-white">
        <div className="flex gap-3">
          <input
            type="text"
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Seaech Users"
          />
          <button className="bg-white text-black rounded-full min-w-9 h-9 flex justify-center items-center">
            <IoSearchSharp />
          </button>
        </div>
        <div className="flex flex-col gap-5">
          <Users />
          <Users />
          <Users />
          <Users />
        </div>
      </div>
      <div className="right w-1/2">
        <div className="userheader border-b-2 border-white p-3">
          <h1 className="font-bold font-lg ">To:BIllibithrea</h1>
        </div>
        <div className="p-5 ">
          <Messages />
          <Messages />
          <Messages />
          <Messages />
        </div>
        <div className="flex p-5 w-1/2 absolute bottom-0">
          <input
            type="text"
            className="flex  h-9 w-4/5    rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Type your message"
          />
          <button className="bg-white text-black w-20">Send</button>
        </div>
      </div>
    </div>
  );
};

export default Home;

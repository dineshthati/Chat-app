import React from "react";
import Users from "../components/Users";
import { IoSearchSharp } from "react-icons/io5";
import Messages from "../components/Messages";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../redux/Slices/dataSlice.js";
import GetUsers from "../hooks/getUsers.js";
import toast from "react-hot-toast";
import { setUsers } from "../redux/Slices/Conversations.js";

const Home = () => {
  const [search, setSearch] = useState("");
  const user = useSelector((state) => state.user.value);
  const [conversations, setConversations] = useState([]);
  const dispatch = useDispatch();
  const { fetchUsers } = GetUsers(setConversations);
  useEffect(() => {
    fetchUsers();
  }, []);
  console.log(conversations);
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/auth/logout`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
      });
      if (res) {
        localStorage.clear();
        dispatch(setData(null));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) {
      return;
    }
    if (search.length < 3) {
      return toast.error("Enter more than 3 letters");
    }
    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      dispatch(setUsers(conversation));
      setSearch("");
    } else {
      toast.error("No user found");
    }
  };

  return (
    <div className="flex justify-center w-full h-full pt-10 relative">
      <div className="left flex flex-col gap-5 border-r-2 p-5 border-white overflow-y-auto">
        <div className="flex gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Seaech Users"
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-white text-black rounded-full min-w-9 h-9 flex justify-center items-center"
          >
            <IoSearchSharp />
          </button>
        </div>
        <div className="flex flex-col gap-5">
          <Users users={conversations} />
          <div className="absolute bottom-0 bg-black py-5">
            <button
              type="submit"
              onClick={(e) => handleLogout(e)}
              className="bg-zinc-600 text-black rounded-xl min-w-24 h-9 flex justify-center items-center"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="right w-1/2 ">
        <div className="userheader border-b-2 border-white p-3 sticky">
          <h1 className="font-bold font-lg ">To:{user?.fullName}</h1>
        </div>
        <div className=" p-5 overflow-y-auto h-\[78vh\]">
          <Messages />
        </div>
        <div className="flex p-5 w-1/2 absolute bottom-0">
          <input
            type="text"
            className="flex h-9 w-4/5 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Type your message"
          />
          <button className="bg-white text-black w-20">Send</button>
        </div>
      </div>
    </div>
  );
};
export default Home;

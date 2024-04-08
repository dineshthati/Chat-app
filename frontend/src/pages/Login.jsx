import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../redux/Slices/dataSlice.js";
import { setUsers } from "../redux/Slices/Conversations.js";

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const { data } = useSelector((state) => state);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(username);
    console.log(password);
    try {
      const res = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await res.json();
      console.log(data);
      toast.success(data.msg);
      localStorage.setItem("chat-user", JSON.stringify(data));

      // Retrieving the data from localStorage
      const retrivedUser = JSON.parse(localStorage.getItem("chat-user"));

      dispatch(setData(retrivedUser));

      if (data.error) {
        toast.error(error.message);
      }
    } catch (error) {
      console.log(error);
      // console.log(await res.text());
    }
  };

  return (
    <div className=" w-full h-full flex items-center justify-center flex-col gap-5">
      <h1 className="text-5xl uppercase">Login</h1>
      <div className="">
        <label htmlFor="input">Username</label>
        <input
          type="text"
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          name="input"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <div className="">
        <label htmlFor="password">Password</label>
        <input
          type="text"
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <button
        type="submit"
        onClick={(e) => handleLogin(e)}
        className="bg-white w-24 h-9 rounded-md shadow-sm text-black"
      >
        Submit
      </button>
      <Link to={"/signup"}>New User? Sign Up</Link>
    </div>
  );
};

export default Login;

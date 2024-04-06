import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
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
        />
      </div>
      <div className="">
        <label htmlFor="password">Password</label>
        <input
          type="text"
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          name="password"
          placeholder="Password"
        />
      </div>
      <button className="bg-white w-24 h-9 rounded-md shadow-sm text-black">
        Submit
      </button>
      <Link to={"/signup"}>New User? Sign Up</Link>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup";
import { toast } from "react-hot-toast";

const Signup = () => {
  const { loading, signup } = useSignup();
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  let handlesubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    await signup(inputs);
    toast.success("Signup succesfull");
  };

  return (
    <div className=" w-full h-full flex items-center justify-center flex-col gap-5">
      <h1 className="text-5xl uppercase">Sign Up</h1>
      <div className="flex flex-col gap-2 w-full items-center justify-center">
        <div className="">
          <label htmlFor="FullNmae">Full Name</label>
          <input
            id="FullNmae"
            value={inputs.fullName}
            onChange={(e) => {
              setInputs({ ...inputs, fullName: e.target.value });
            }}
            type="text"
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            name="FullNmae"
            placeholder="Full Name"
          />
        </div>
        <div className="">
          <label htmlFor="input">Username</label>
          <input
            id="input"
            value={inputs.username}
            onChange={(e) => {
              setInputs({ ...inputs, username: e.target.value });
            }}
            type="text"
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            name="input"
            placeholder="Username"
          />
        </div>
        <div className="">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            value={inputs.password}
            onChange={(e) => {
              setInputs({ ...inputs, password: e.target.value });
            }}
            type="password"
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            name="password"
            placeholder="Password"
          />
        </div>
        <div className="">
          <label htmlFor="confirmpassword">Confirm password</label>
          <input
            id="confirmpassword"
            value={inputs.confirmPassword}
            onChange={(e) => {
              setInputs({ ...inputs, confirmPassword: e.target.value });
            }}
            type="password"
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            name="confirmpassword"
            placeholder="confirmpassword"
          />
        </div>
        <div className="flex gap-5">
          <div className="">
            <label htmlFor="male" className="mr-5">
              Male
            </label>
            <input
              className="dark:border-white-400/20 dark:scale-100 transition-all duration-500 ease-in-out dark:hover:scale-110 dark:checked:scale-100 w-4 h-4"
              checked={inputs.gender == "male"}
              id="male"
              type="checkbox"
              name="male"
              value={inputs.gender}
              onChange={(e) => {
                setInputs({ ...inputs, gender: "male" });
              }}
            />
          </div>
          <div className="">
            <label htmlFor="female" className="mr-5">
              Female
            </label>
            <input
              className="dark:border-white-400/20 dark:scale-100 transition-all duration-500 ease-in-out dark:hover:scale-110 dark:checked:scale-100 w-4 h-4"
              checked={inputs.gender == "female"}
              value={inputs.username}
              onChange={(e) => {
                setInputs({ ...inputs, gender: "female" });
              }}
              type="checkbox"
              name="female"
              id="female"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <Link to={"/login"}>Already a user? Login</Link>
          <button
            type="submit"
            onClick={(e) => handlesubmit(e)}
            className="bg-white w-24 h-9 rounded-md shadow-sm text-black"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;

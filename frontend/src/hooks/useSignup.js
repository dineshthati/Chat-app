import React, { useState } from "react";
import { toast } from "react-hot-toast";

import { useDispatch } from "react-redux";
import { setData } from "../redux/Slices/dataSlice.js";

const useSignup = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = inputValidation({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });

    if (!success) return;
    setLoading(true);
    try {
      console.log("signup success");
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          username,
          password,
          confirmPassword,
          gender,
        }),
      });
      const data = await res.json();
      console.log(data);
      // Storing the data in localStorage
      localStorage.setItem("chat-user", JSON.stringify(data));

      // Retrieving the data from localStorage
      const retrivedUser = JSON.parse(localStorage.getItem("chat-user"));

      dispatch(setData(retrivedUser));
      if (data.error) {
        toast.error(error.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading };
};

export default useSignup;

const inputValidation = ({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) => {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill all the fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  return true;
};

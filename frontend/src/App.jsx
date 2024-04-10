import React, { useEffect, useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Navigate, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";

import io from "socket.io-client";

import { setOnlineUsers } from "./redux/Slices/onlineUsers.js";
import { setSocket } from "./redux/Slices/socketSlice.js";

const App = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.value);
  const { socket } = useSelector((store) => store.socket);
  const { onlineUsers } = useSelector((state) => state.onlineUser);

  useEffect(() => {
    if (data) {
      const socketio = io(`http://localhost:8000/`, {
        query: {
          userId: data?.newUser?.id,
        },
      });
      dispatch(setSocket(socketio));

      socketio?.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
      return () => socketio.close();
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [data]);
  return (
    <div className="bg-[#09090B] text-white w-full h-screen">
      <Routes>
        <Route
          path="/"
          element={data?.newUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={data?.newUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={data?.newUser ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;

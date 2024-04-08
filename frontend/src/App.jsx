import React, { useEffect, useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Navigate, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
// Remove import of persistor
import io from "socket.io-client";
import {
  setSocketId,
  setConnectionStatus,
} from "./redux/Slices/socketSlice.js";
import { setOnlineUsers } from "./redux/Slices/onlineUsers.js";

const App = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.value);
  const { socketId, connectionStatus } = useSelector((state) => state.socket);
  const { onlineUsers } = useSelector((state) => state.onlineUser);

  useEffect(() => {
    if (data) {
      const socketio = io("http://localhost:8000", {
        query: { userId: data._id },
      });

      // Set the socket ID and connection status in the Redux store
      dispatch(setSocketId(socketio.id));
      dispatch(setConnectionStatus(true));

      // Listen for the 'getOnlineUsers' event
      socketio.on("getOnlineUsers", (users) => {
        dispatch(setOnlineUsers(users));
      });

      // Clean up the socket connection on component unmount
      return () => {
        socketio.off("getOnlineUsers");
        socketio.close();
        dispatch(setSocketId(null));
        dispatch(setConnectionStatus(false));
      };
    } else {
      // If the `data` is not available, close the socket connection
      if (connectionStatus) {
        dispatch(setConnectionStatus(false));
      }
    }
  }, [data, dispatch, connectionStatus]);

  // Monitor the `onlineUsers` state
  useEffect(() => {
    console.log("Online Users:", onlineUsers);
  }, [onlineUsers]);

  // Use the `onlineUsers` from the Redux store
  console.log("Online Users:", onlineUsers);
  return (
    <div className="bg-[#09090B] text-white w-full h-screen">
      {/* Remove PersistGate */}
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

import React, { useEffect, useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Navigate, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store.js";
import io from "socket.io-client";
import { setSocket } from "./redux/Slices/socketSlice.js";
import { setOnlineUser } from "./redux/Slices/onlineUsers.js";

const App = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.value);
  const socket = useSelector((state) => state?.onlineUsers?.value);
  console.log(data);

  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (data) {
      const socket = io("http://localhost:8000", {
        query: {
          userId: data._id,
        },
      });
      dispatch(setSocket(socket));

      socket.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUser(onlineUsers));
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [data]);

  return (
    <div className="bg-[#09090B] text-white w-full h-screen">
      <PersistGate loading={null} persistor={persistor}>
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
      </PersistGate>
    </div>
  );
};

export default App;

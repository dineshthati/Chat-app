import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./Slices/dataSlice.js";
import userReducer from "./Slices/Conversations.js";
import socketReducer from "./Slices/socketSlice.js";
import onlineUserReducer from "./Slices/onlineUsers.js";
import messageReducer from "./Slices/messageSlice.js";

export const store = configureStore({
  reducer: {
    data: dataReducer,
    user: userReducer,
    socket: socketReducer,
    onlineUser: onlineUserReducer,
    message: messageReducer,
  },
});

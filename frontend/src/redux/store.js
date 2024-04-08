import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./Slices/dataSlice.js";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./Slices/Conversations.js";
import socketReducer from "./Slices/socketSlice.js";
import onlineUserReducer from "./Slices/onlineUsers.js";
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, dataReducer);

export const store = configureStore({
  reducer: {
    data: persistedReducer,
    user: userReducer,
    socket: socketReducer,
    onlineUser: onlineUserReducer,
  },
});

export const persistor = persistStore(store);

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import dataReducer from "./Slices/dataSlice.js";
import userReducer from "./Slices/Conversations.js";
import socketReducer from "./Slices/socketSlice.js";
import onlineUserReducer from "./Slices/onlineUsers.js";
import messageReducer from "./Slices/messageSlice.js";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const rootReducer = combineReducers({
  data: dataReducer,
  user: userReducer,
  socket: socketReducer,
  onlineUser: onlineUserReducer,
  message: messageReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

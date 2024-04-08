import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    socketId: null,
    connectionStatus: false,
  },
  reducers: {
    setSocketId: (state, action) => {
      state.socketId = action.payload;
    },
    setConnectionStatus: (state, action) => {
      state.connectionStatus = action.payload;
    },
  },
});

export const { setSocketId, setConnectionStatus } = socketSlice.actions;
export default socketSlice.reducer;

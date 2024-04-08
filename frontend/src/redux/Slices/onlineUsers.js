import { createSlice } from "@reduxjs/toolkit";

const onlineUser = createSlice({
  name: "OnlineUsers",
  initialState: {
    onlineUsers: [],
  },
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const { setOnlineUsers } = onlineUser.actions;
export default onlineUser.reducer;

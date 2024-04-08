import { createSlice } from "@reduxjs/toolkit";

const onlineUser = createSlice({
  name: "OnlineUsers",
  initialState: {
    onlineUsers: null,
  },
  reducers: {
    setOnlineUser: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const { setOnlineUser } = onlineUser.actions;
export default onlineUser.reducer;

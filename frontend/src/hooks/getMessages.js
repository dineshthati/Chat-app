import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/Slices/messageSlice";

const getMessages = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/messages/${user?._id}`);
        const data = await res.json();
        dispatch(setMessages(data));
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [user?._id, setMessages]);
};

export default getMessages;

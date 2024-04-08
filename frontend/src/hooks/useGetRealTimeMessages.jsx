import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/Slices/messageSlice.js";

const useGetRealTimeMessage = () => {
  const { socket } = useSelector((store) => store.socket);
  const { messages } = useSelector((store) => store.message);
  const dispatch = useDispatch();
  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      dispatch(setMessages([...messages, newMessage]));
      console.log(newMessage);
    });
    return () => socket?.off("newMessage");
  }, [setMessages, messages]);
};
export default useGetRealTimeMessage;

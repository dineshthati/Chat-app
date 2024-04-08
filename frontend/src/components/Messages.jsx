import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import getMessages from "../hooks/getMessages";
const Messages = () => {
  const user = useSelector((state) => state.user.value);
  const { messages, fetchMessages } = getMessages(user);
  useEffect(() => {
    if (user) {
      fetchMessages(user._id);
    }
  }, [user, fetchMessages]);
  return (
    <div>
      {Array.isArray(messages) && messages.length > 0 ? (
        messages.map((item, index) => (
          <div className=" text-white flex gap-5 mt-3" key={`message-${index}`}>
            <img className="w-8 h-8 rounded-full" src="" alt="" />
            <span className="bg-zinc-800 p-2 rounded-xl">{item.message}</span>
          </div>
        ))
      ) : (
        <div>No messages found.</div>
      )}
    </div>
  );
};
export default Messages;

import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import getMessages from "../hooks/getMessages.js";
import useGetRealTimeMessage from "../hooks/useGetRealTimeMessages";

import notificationSound from "../assets/frontend_src_assets_sounds_notification.mp3";

const Messages = ({ messages, messageSenderId }) => {
  const user = useSelector((state) => state.user.value);

  const data = useSelector((state) => state.data.value);
  const isSender = data?.newUser?.id === messageSenderId;

  const scroll = useRef();

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!isSender) {
      const audio = new Audio(notificationSound);
      audio.play();
    }
  }, [messages]);

  return (
    <div>
      {messages && messages.length > 1 ? (
        <div
          ref={scroll}
          className={`chat ${isSender ? "chat-end" : "chat-start"} `}
        >
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src={
                  isSender
                    ? data?.newUser?.profilePhotoUrl
                    : user?.profilePhotoUrl
                }
              />
            </div>
          </div>

          <div className="chat-bubble">{messages}</div>
        </div>
      ) : (
        <div>No messages found...</div>
      )}
    </div>
  );
};
export default Messages;

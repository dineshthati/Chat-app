// getMessages.js
import { useState, useCallback } from "react";

const getMessages = (user) => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = useCallback(async (id) => {
    try {
      const res = await fetch(`/api/messages/${id}`);
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, []);

  return { messages, fetchMessages };
};

export default getMessages;

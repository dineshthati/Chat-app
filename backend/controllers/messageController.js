import Coversation from "../models/conversationSchema.js";
import Message from "../models/messageModel.js";
import { io } from "../socket/socket.js";
import { getReceiverSocketId } from "../socket/socket.js";

export const messageController = async (req, res) => {
  console.log("sending message");
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Coversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Coversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
      await conversation.save();
      await newMessage.save();
    }

    const receiverSocketId = getReceiverSocketId(receiverId);
    console.log(receiverSocketId);
    if (receiverSocketId) {
      console.log(newMessage.message);
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    console.log("A message sent");
    return res.json({ newMessage, conversation });
  } catch (error) {
    console.log("An eroor in the controller");
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChat } = req.params;
    const senderId = req.user._id;
    const conversation = await Coversation.findOne({
      participants: { $all: [senderId, userToChat] },
    }).populate("messages");

    if (
      conversation &&
      conversation.messages &&
      conversation.messages.length > 0
    ) {
      return res.json(conversation.messages);
    } else {
      return res.json(["No messages found"]);
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching messages" });
  }
};

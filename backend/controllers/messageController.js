import Coversation from "../models/conversationSchema.js";
import Message from "../models/messageModel.js";

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
    return res.json({ newMessage, conversation });
  } catch (error) {
    console.log("An eroor in the controller");
  }
};

export const getMessages = async (req, res) => {
  const { id: userToChat } = req.params;
  const senderId = req.user._id;
  const conversation = await Coversation.findOne({
    participants: { $all: [senderId, userToChat] },
  }).populate("messages");
  return res.json(conversation.messages);
};

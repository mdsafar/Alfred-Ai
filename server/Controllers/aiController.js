import asyncHandler from "express-async-handler";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Chats from "../Models/chatModel.js";

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export const aiQuestion = asyncHandler(async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const { userId, prompt, chatId, results } = req.body;

    let history;

    if (chatId) {
      history = await Chats.findById(chatId).populate("chats");
    } else if (userId) {
      history = new Chats({ user: userId });
    }

    if (!chatId && history) {
      history.title = prompt;
    }

    const chat = model.startChat({
      history: history
        ? history.chats.map((el) => ({ role: el.role, parts: el.parts }))
        : results?.map((el) => ({ role: el.role, parts: el.parts })),
      generationConfig: {
        maxOutputTokens: 2048,
      },
    });

    const result = await chat.sendMessage(prompt);
    const response = result.response;
    const text = response.text();

    const isText = text ? text : "Something Worng Try Again!!!";

    if (!userId) {
      return res.status(200).json({ text: isText });
    }

    history.chats.push({ role: "user", parts: prompt });
    history.chats.push({ role: "model", parts: isText });

    await history.save();

    res.status(200).json({ text: isText, chatId: history._id });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "An error occurred" });
  }
});

export const getAllChatRooms = asyncHandler(async (req, res) => {
  try {
    const user = req.user._id;

    const chatRooms = await Chats.find({ user });

    if (!chatRooms) {
      res.status(400).json({
        message: "No Chats",
      });
    }

    res.status(200).json(chatRooms);
  } catch (err) {
    res.status(401).json(err);
    console.log(err);
  }
});

export const getAllChats = asyncHandler(async (req, res) => {
  try {
    const id = req.params.chatId;
    const chats = await Chats.findById(id).populate("chats");

    if (!chats) {
      return res.status(401).json({
        message: "No Chats",
      });
    }

    res.status(200).json(chats.chats);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

export const deleteChatRoom = asyncHandler(async (req, res) => {
  try {
    const id = req.params.chatId;

    await Chats.findByIdAndDelete(id);

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

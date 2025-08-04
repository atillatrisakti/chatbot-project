import "dotenv/config";
import express from "express";
import multer from "multer";
import * as fs from "node:fs";
import { GoogleGenAI } from "@google/genai";
import cors from "cors";

const extractGeneratedText = (data) => {
  try {
    const text =
      data?.response?.candidates?.[0]?.content?.parts?.[0]?.text ??
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      data?.response?.candidates?.[0]?.content?.text;

    return text ?? JSON.stringify(data, null, 2);
  } catch (err) {
    console.error("Gagal ketika mengambil text:", err);
    return JSON.stringify(data, null, 2);
  }
};

const app = express();
const upload = multer();
const GEMINI_MODEL = "gemini-2.5-flash";
const ai = new GoogleGenAI({
  apiKey: process.env.API_KEY,
});
app.use(
  cors({
    origin: "*", // Allow all origins
    credentials: true, // Allow credentials
  })
);
app.use(express.json());

// Generate from text
app.post("/chat", async (req, res) => {
  try {
    // if (!req.body) {
    //   return res.status(400).json({ error: "Request body is required" });
    // }

    const { messages } = req.body;
    // if (!Array.isArray(messages)) {
    //   return res.status(400).json({ error: "Messages must be an array" });
    // }
    if (!messages) {
      return res.status(400).json({ error: "Messages are required" });
    }

    const payload = messages.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }));
    const resp = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: payload,
    });
    res.json({ result: extractGeneratedText(resp) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Generate from image
app.post("/generate-from-image", upload.single("image"), async (req, res) => {
  try {
    const prompt = req.body?.prompt;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "Image file is required" });
    }
    const imageBase64 = req.file.buffer.toString("base64");
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [
        { text: prompt },
        { inlineData: { mimeType: req.file.mimetype, data: imageBase64 } },
      ],
    });
    res.json({ result: extractGeneratedText(response) });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// Generate from audio
app.post("/generate-from-audio", upload.single("audio"), async (req, res) => {
  try {
    const prompt = req.body?.prompt;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "Audio file is required" });
    }
    const audioBase64 = req.file.buffer.toString("base64");
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [
        { text: prompt },
        { inlineData: { mimeType: req.file.mimetype, data: audioBase64 } },
      ],
    });
    res.json({ result: extractGeneratedText(response) });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

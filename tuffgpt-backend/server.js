import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are TuffGPT. Direct. Strategic. No fluff." },
        { role: "user", content: message }
      ]
    });

    res.json({ reply: completion.choices[0].message.content });

  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "Server error." });
  }
});

app.listen(3000, () => {
  console.log("TuffGPT backend running.");
});
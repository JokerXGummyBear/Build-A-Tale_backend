require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
const PORT = process.env.PORT || 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());
app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});
app.post('/generate', async (req, res) => {
  try {
    const { prompt } = req.body;

    const chat = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ story: chat.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Build-A-Tale backend running on port ${PORT}`);
});

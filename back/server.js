import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
        max_tokens: 150
      })
    });
    const data = await response.json();
    const aiText = data.choices[0].message.content.trim();
    res.json({ reply: aiText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "Oups, l'IA ne répond pas 😢" });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
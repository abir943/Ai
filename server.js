// server.js
require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/openai', async (req, res) => {
  const question = req.query.ask;

  if (!question) {
    return res.json({
      status: false,
      operator: "aminul sordar",
      message: "Missing 'ask' query parameter. Example: /openai?ask=your_question"
    });
  }

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: question }]
      })
    });

    const data = await openaiRes.json();
    const reply = data.choices?.[0]?.message?.content || "No response from OpenAI.";

    res.json({
      status: true,
      operator: "aminul sordar",
      message: reply
    });
  } catch (error) {
    res.json({
      status: false,
      operator: "aminul sordar",
      message: "Error communicating with OpenAI API."
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// 🎨 Aminul's Gemini-style API for Render (Fixed OpenAI usage)
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const chalk = require("chalk");
const figlet = require("figlet");
const gradient = require("gradient-string");
const { OpenAI } = require("openai");

const app = express();
app.use(cors());

// ✅ OpenAI instance setup (for v4+)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// 🌈 Show fancy banner
const showBanner = () => {
  console.clear();
  console.log(
    gradient.fruit(
      figlet.textSync("Aminul API", { horizontalLayout: "fitted" })
    )
  );
  console.log(chalk.cyanBright("🌐 Endpoint: /gemini?ask=YourQuestion"));
  console.log(chalk.magenta("🤖 Powered by OpenAI | Render Ready"));
  console.log("");
};

// 🎯 Route
app.get("/gemini", async (req, res) => {
  const ask = req.query.ask;
  if (!ask) {
    return res.status(400).json({
      status: false,
      message: "❌ Please use ?ask=your_question"
    });
  }

  try {
    console.log(chalk.yellow("💬 Prompt received:"), ask);

    const chat = await openai.chat.completions.create({
      model: "gpt-4o", // or "gpt-3.5-turbo"
      messages: [{ role: "user", content: ask }],
    });

    const reply = chat.choices[0].message.content;
    console.log(chalk.greenBright("✅ Response sent"));

    res.json({
      status: true,
      operator: "Aminul",
      gemini: reply
    });
  } catch (err) {
    console.log(chalk.red("⛔ Error:"), err.message);
    res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: err.message
    });
  }
});

// 🌐 Start Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  showBanner();
  console.log(chalk.green(`🚀 Server running on http://localhost:${PORT}/gemini`));
});

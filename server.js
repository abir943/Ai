// 🎨 Aminul's Gemini-style Chat API (Render Compatible - Fully Fixed)

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const chalk = require("chalk");
const figlet = require("figlet");
const gradient = require("gradient-string");
const { OpenAI } = require("openai");

const app = express();
app.use(cors());

// ✅ OpenAI Setup (v4+)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// 🌈 Show Fancy Banner (Fixed)
const showBanner = () => {
  console.clear();
  console.log(
    gradient.fruit(
      figlet.textSync("Aminul API", { horizontalLayout: "fitted" })
    )
  );
  console.log(chalk.cyan("🌐 Endpoint:"), "/gemini?ask=YourQuestion");
  console.log(chalk.magenta("🤖 Powered by OpenAI | Render Ready"));
  console.log("");
};

// 🚀 Main Route
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
      model: "gpt-4o", // or gpt-3.5-turbo, gpt-4
      messages: [{ role: "user", content: ask }],
    });

    const reply = chat.choices[0].message.content;

    console.log(chalk.greenBright("✅ Reply sent"));
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

// 🌐 Server Listen (Render uses PORT from env)
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  showBanner();
  console.log(chalk.green(`🚀 Server running on http://localhost:${PORT}/gemini`));
});

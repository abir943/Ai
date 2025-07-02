// public/script.js
async function askOpenAI() {
  const input = document.getElementById("userInput").value;
  const responseDiv = document.getElementById("response");

  if (!input.trim()) {
    responseDiv.innerText = "⚠️ Please enter a question.";
    return;
  }

  responseDiv.innerText = "⏳ Thinking...";

  try {
    const res = await fetch(`/openai?ask=${(input)}`);
    const data = await res.json();

    if (data.status) {
      responseDiv.innerText = `🤖 ${data.message}`;
    } else {
      responseDiv.innerText = `❌ ${data.message}`;
    }
  } catch (err) {
    responseDiv.innerText = "❌ Error contacting server.";
  }
}

  require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const app = express();
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {polling: true});

async function masterAgent(userMessage) {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{
          role: 'user',
          content: `You are Master AI Agent. User said: ${userMessage}. Give helpful detailed response in same language user used.`
        }],
        max_tokens: 1024
      })
    });
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    return '❌ Error: ' + error.message;
  }
}

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id,
    '🔱 AI God System Active!\n\nCommands:\n/research [topic]\n/content [topic]\n/plan [idea]\n\nYa koi bhi message karo!'
  );
});

bot.onText(/\/research (.+)/, async (msg, match) => {
  await bot.sendMessage(msg.chat.id, '🔍 Researching...');
  const result = await masterAgent('Research: ' + match[1]);
  await bot.sendMessage(msg.chat.id, result);
});

bot.onText(/\/content (.+)/, async (msg, match) => {
  await bot.sendMessage(msg.chat.id, '✍️ Creating...');
  const result = await masterAgent('Create content about: ' + match[1]);
  await bot.sendMessage(msg.chat.id, result);
});

bot.onText(/\/plan (.+)/, async (msg, match) => {
  await bot.sendMessage(msg.chat.id, '🚀 Planning...');
  const result = await masterAgent('Business plan for: ' + match[1]);
  await bot.sendMessage(msg.chat.id, result);
});

bot.on('message', async (msg) => {
  if (!msg.text) return;
  if (msg.text.startsWith('/')) return;
  const result = await masterAgent(msg.text);
  await bot.sendMessage(msg.chat.id, result);
});

app.get('/', (req, res) => res.send('🔱 AI God System Running!'));
app.listen(process.env.PORT || 3000, () => console.log('✅ Server Running!'));

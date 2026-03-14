  require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const Groq = require('groq-sdk');
const express = require('express');

const app = express();
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {polling: true});
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function masterAgent(userMessage) {
  try {
    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{
        role: 'user',
        content: `You are Master AI Agent of a digital empire system.
        User said: ${userMessage}
        Give helpful detailed response in same language user used.`
      }],
      max_tokens: 1024
    });
    return response.choices[0].message.content;
  } catch (error) {
    return '❌ Error: ' + error.message;
  }
}

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id,
    '🔱 AI God System Active!\n\n' +
    'Commands:\n' +
    '/research [topic]\n' +
    '/content [topic]\n' +
    '/plan [idea]\n\n' +
    'Ya koi bhi message karo!'
  );
});

bot.onText(/\/research (.+)/, async (msg, match) => {
  await bot.sendMessage(msg.chat.id, '🔍 Researching...');
  const result = await masterAgent('Do detailed research on: ' + match[1]);
  await bot.sendMessage(msg.chat.id, result);
});

bot.onText(/\/content (.+)/, async (msg, match) => {
  await bot.sendMessage(msg.chat.id, '✍️ Creating content...');
  const result = await masterAgent('Create detailed content about: ' + match[1]);
  await bot.sendMessage(msg.chat.id, result);
});

bot.onText(/\/plan (.+)/, async (msg, match) => {
  await bot.sendMessage(msg.chat.id, '🚀 Creating plan...');
  const result = await masterAgent('Create detailed business plan for: ' + match[1]);
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
3. package.json Bhi Update Karo:
github.com/zohibpatha/Ai-God-system-/edit/main/package.json
{
  "name": "ai-god-system",
  "version": "1.0.0",
  "description": "Super AI God System",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "node-telegram-bot-api": "^0.66.0",
    "groq-sdk": "^0.3.0",
    "express": "^4.18.2",
    "dotenv": "^16.3.1"
  }
                        }

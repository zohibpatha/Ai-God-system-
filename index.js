require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const Anthropic = require('@anthropic-ai/sdk');
const express = require('express');

const app = express();
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {polling: true});
const claude = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY });

console.log('🔱 AI God System Starting...');

// Master AI Agent
async function masterAgent(userMessage) {
  const response = await claude.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: `You are the Master AI Agent of a digital empire system.
      User command: ${userMessage}
      
      Analyze this command and respond with:
      1. What task this is
      2. Which agent should handle it
      3. Step by step execution plan
      
      Be concise and actionable.`
    }]
  });
  return response.content[0].text;
}

// Telegram Bot Commands
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 
    '🔱 AI God System Active!\n\n' +
    'Commands:\n' +
    '/research [topic] - Research any topic\n' +
    '/content [topic] - Generate content\n' +
    '/plan [idea] - Business plan\n' +
    '/help - Show commands'
  );
});

bot.onText(/\/research (.+)/, async (msg, match) => {
  const topic = match[1];
  bot.sendMessage(msg.chat.id, '🔍 Researching: ' + topic + '...');
  const result = await masterAgent('Do market research on: ' + topic);
  bot.sendMessage(msg.chat.id, '📊 Research Results:\n\n' + result);
});

bot.onText(/\/content (.+)/, async (msg, match) => {
  const topic = match[1];
  bot.sendMessage(msg.chat.id, '✍️ Creating content for: ' + topic + '...');
  const result = await masterAgent('Create engaging content about: ' + topic);
  bot.sendMessage(msg.chat.id, '📝 Content Ready:\n\n' + result);
});

bot.onText(/\/plan (.+)/, async (msg, match) => {
  const idea = match[1];
  bot.sendMessage(msg.chat.id, '🚀 Creating business plan for: ' + idea + '...');
  const result = await masterAgent('Create a business plan for: ' + idea);
  bot.sendMessage(msg.chat.id, '💼 Business Plan:\n\n' + result);
});

// Handle any message
bot.on('message', async (msg) => {
  if (msg.text && !msg.text.startsWith('/')) {
    bot.sendMessage(msg.chat.id, '⚡ Processing...');
    const result = await masterAgent(msg.text);
    bot.sendMessage(msg.chat.id, '🔱 AI Response:\n\n' + result);
  }
});

// Express server for Railway
app.get('/', (req, res) => {
  res.send('🔱 AI God System is Running!');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('✅ Server Running!');
});

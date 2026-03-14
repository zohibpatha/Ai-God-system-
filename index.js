require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const app = express();
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {polling: true});

// Master AI Function
async function askAI(prompt) {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 2048
      })
    });
    const data = await response.json();
    if (data && data.choices && data.choices[0]) {
      return data.choices[0].message.content;
    }
    return '❌ AI response error. Try again.';
  } catch (error) {
    return '❌ Error: ' + error.message;
  }
}

// Send long messages safely
async function sendMessage(chatId, text) {
  try {
    if (text.length > 4000) {
      const parts = text.match(/.{1,4000}/gs);
      for (const part of parts) {
        await bot.sendMessage(chatId, part);
      }
    } else {
      await bot.sendMessage(chatId, text);
    }
  } catch (e) {
    console.error('Send error:', e.message);
  }
}

// /start
bot.onText(/\/start/, (msg) => {
  sendMessage(msg.chat.id,
    '🔱 *AI God System Active!*\n\n' +
    '📋 *Commands:*\n\n' +
    '🔍 /research [topic] - Market research\n' +
    '📝 /script [topic] - YouTube script\n' +
    '💡 /ideas [niche] - Video ideas\n' +
    '🎯 /title [topic] - Titles & tags\n' +
    '📅 /schedule [niche] - Content calendar\n' +
    '💼 /plan [idea] - Business plan\n' +
    '✍️ /content [topic] - Blog/caption\n' +
    '💰 /monetize [niche] - Money strategies\n' +
    '🤖 /agent - What agents can do\n\n' +
    'Ya seedha koi bhi sawaal poocho!'
  );
});

// /research
bot.onText(/\/research (.+)/, async (msg, match) => {
  await sendMessage(msg.chat.id, '🔍 Researching: ' + match[1] + '...');
  const result = await askAI(
    `You are an expert market researcher. Do a detailed research on: "${match[1]}"
    Include:
    1. Market Overview
    2. Target Audience
    3. Top Competitors
    4. Trending Topics
    5. Monetization Opportunities
    6. Action Steps
    Reply in the same language the topic is written in.`
  );
  await sendMessage(msg.chat.id, '📊 Research Results:\n\n' + result);
});

// /script
bot.onText(/\/script (.+)/, async (msg, match) => {
  await sendMessage(msg.chat.id, '📝 Writing script for: ' + match[1] + '...');
  const result = await askAI(
    `You are a professional YouTube scriptwriter. Write a complete engaging YouTube script for: "${match[1]}"
    Include:
    - Hook (first 15 seconds)
    - Introduction
    - Main Content (3-5 sections)
    - Call to Action
    - Outro
    Make it engaging, informative and optimized for retention.
    Reply in the same language the topic is written in.`
  );
  await sendMessage(msg.chat.id, '🎬 YouTube Script:\n\n' + result);
});

// /ideas
bot.onText(/\/ideas (.+)/, async (msg, match) => {
  await sendMessage(msg.chat.id, '💡 Generating ideas for: ' + match[1] + '...');
  const result = await askAI(
    `You are a YouTube content strategist. Generate 10 viral video ideas for the "${match[1]}" niche.
    For each idea include:
    - Video Title
    - Why it will go viral
    - Target audience
    - Estimated views potential
    Reply in the same language the topic is written in.`
  );
  await sendMessage(msg.chat.id, '💡 Video Ideas:\n\n' + result);
});

// /title
bot.onText(/\/title (.+)/, async (msg, match) => {
  await sendMessage(msg.chat.id, '🎯 Creating titles for: ' + match[1] + '...');
  const result = await askAI(
    `You are a YouTube SEO expert. For the topic "${match[1]}" create:
    1. 5 Viral YouTube Titles
    2. 20 Relevant Tags
    3. 150 word SEO Description
    4. Thumbnail text suggestion
    Reply in the same language the topic is written in.`
  );
  await sendMessage(msg.chat.id, '🎯 Titles & SEO:\n\n' + result);
});

// /schedule
bot.onText(/\/schedule (.+)/, async (msg, match) => {
  await sendMessage(msg.chat.id, '📅 Creating schedule for: ' + match[1] + '...');
  const result = await askAI(
    `You are a content planning expert. Create a 4-week content calendar for "${match[1]}" YouTube channel.
    For each week provide:
    - 3 video topics
    - Best upload days/times
    - Content themes
    - Growth strategy
    Reply in the same language the topic is written in.`
  );
  await sendMessage(msg.chat.id, '📅 Content Calendar:\n\n' + result);
});

// /plan
bot.onText(/\/plan (.+)/, async (msg, match) => {
  await sendMessage(msg.chat.id, '💼 Creating business plan for: ' + match[1] + '...');
  const result = await askAI(
    `You are a business strategist. Create a detailed business plan for: "${match[1]}"
    Include:
    1. Business Overview
    2. Revenue Streams
    3. Target Market
    4. Competition Analysis
    5. Marketing Strategy
    6. 90-day Action Plan
    7. Investment needed
    8. Expected ROI
    Reply in the same language the topic is written in.`
  );
  await sendMessage(msg.chat.id, '💼 Business Plan:\n\n' + result);
});

// /content
bot.onText(/\/content (.+)/, async (msg, match) => {
  await sendMessage(msg.chat.id, '✍️ Creating content for: ' + match[1] + '...');
  const result = await askAI(
    `You are a content creation expert. Create the following for "${match[1]}":
    1. Blog Post (500 words)
    2. Instagram Caption (with hashtags)
    3. Twitter/X Thread (5 tweets)
    4. YouTube Description
    Reply in the same language the topic is written in.`
  );
  await sendMessage(msg.chat.id, '✍️ Content Package:\n\n' + result);
});

// /monetize
bot.onText(/\/monetize (.+)/, async (msg, match) => {
  await sendMessage(msg.chat.id, '💰 Finding monetization for: ' + match[1] + '...');
  const result = await askAI(
    `You are a digital monetization expert. Give complete monetization strategies for "${match[1]}":
    1. Direct Revenue Methods
    2. Affiliate Marketing opportunities
    3. Sponsorship potential
    4. Digital Products ideas
    5. Monthly income potential
    6. How to start earning in 30 days
    Reply in the same language the topic is written in.`
  );
  await sendMessage(msg.chat.id, '💰 Monetization Plan:\n\n' + result);
});

// /agent
bot.onText(/\/agent/, (msg) => {
  sendMessage(msg.chat.id,
    '🤖 *AI God System Agents:*\n\n' +
    '🧠 Master Agent - Controls everything\n' +
    '🔍 Research Agent - Market analysis\n' +
    '📝 Content Agent - Creates content\n' +
    '🎬 Script Agent - YouTube scripts\n' +
    '💡 Ideas Agent - Viral ideas\n' +
    '🎯 SEO Agent - Titles & tags\n' +
    '📅 Schedule Agent - Content calendar\n' +
    '💼 Business Agent - Business plans\n' +
    '💰 Monetize Agent - Money strategies\n\n' +
    'All agents powered by Groq AI! 🚀'
  );
});

// Any message
bot.on('message', async (msg) => {
  if (!msg.text) return;
  if (msg.text.startsWith('/')) return;
  const result = await askAI(
    `You are Master AI Agent of a digital empire system. 
    User said: "${msg.text}"
    Give a helpful, detailed response.
    Reply in the same language the user used.`
  );
  await sendMessage(msg.chat.id, result);
});

app.get('/', (req, res) => res.send('🔱 AI God System Running!'));
app.listen(process.env.PORT || 3000, () => console.log('✅ AI God System Started!'));

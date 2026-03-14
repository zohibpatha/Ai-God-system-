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

// Safe message sender
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
    '🔱 AI God System Active!\n\n' +
    '📋 Commands:\n\n' +
    '🔍 /research [topic]\n' +
    '📝 /script [topic]\n' +
    '💡 /ideas [niche]\n' +
    '🎯 /title [topic]\n' +
    '📅 /schedule [niche]\n' +
    '💼 /plan [idea]\n' +
    '✍️ /content [topic]\n' +
    '💰 /monetize [niche]\n' +
    '🎨 /thumbnail [topic]\n' +
    '📧 /email [topic]\n' +
    '📱 /instagram [topic]\n' +
    '💵 /income [niche]\n' +
    '🌐 /website [idea]\n' +
    '📊 /analytics [channel]\n' +
    '🔔 /motivate\n' +
    '💬 /reply [situation]\n' +
    '🤖 /agent\n\n' +
    'Ya seedha koi bhi sawaal poocho!'
  );
});

// /research
bot.onText(/\/research (.+)/, async (msg, match) => {
  await sendMessage(msg.chat.id, '🔍 Researching: ' + match[1] + '...');
  const result = await askAI(
    `You are an expert market researcher. Do detailed research on: "${match[1]}"
    Include:
    1. Market Overview
    2. Target Audience
    3. Top Competitors
    4. Trending Topics
    5. Monetization Opportunities
    6. Action Steps
    Reply in same language as the topic.`
  );
  await sendMessage(msg.chat.id, '📊 Research Results:\n\n' + result);
});

// /script
bot.onText(/\/script (.+)/, async (msg, match) => {
  await sendMessage(msg.chat.id, '📝 Writing script for: ' + match[1] + '...');
  const result = await askAI(
    `You are a professional YouTube scriptwriter. Write complete YouTube script for: "${match[1]}"
    Include:
    - Hook (first 15 seconds)
    - Introduction
    - Main Content (3-5 sections)
    - Call to Action
    - Outro
    Reply in same language as the topic.`
  );
  await sendMessage(msg.chat.id, '🎬 YouTube Script:\n\n' + result);
});

// /ideas
bot.onText(/\/ideas (.+)/, async (msg, match) => {
  await sendMessage(msg.chat.id, '💡 Generating ideas for: ' + match[1] + '...');
  const result = await askAI(
    `You are a YouTube content strategist. Generate 10 viral video ideas for "${match[1]}" niche.
    For each idea:
    - Video Title
    - Why it will go viral
    - Target audience
    - Estimated views potential
    Reply in same language as the topic.`
  );
  await sendMessage(msg.chat.id, '💡 Video Ideas:\n\n' + result);
});

// /title
bot.onText(/\/title (.+)/, async (msg, match) => {
  await sendMessage(msg.chat.id, '🎯 Creating titles for: ' + match[1] + '...');
  const result = await askAI(
    `You are a YouTube SEO expert. For "${match[1]}" create:
    1. 5 Viral YouTube Titles
    2. 20 Relevant Tags
    3. 150 word SEO Description
    4. Thumbnail text suggestion
    Reply in same language as the topic.`
  );
  await sendMessage(msg.chat.id, '🎯 Titles & SEO:\n\n' + result);
});

// /schedule
bot.onText(/\/schedule (.+)/, async (msg, match) => {
  await sendMessage(msg.chat.id, '📅 Creating schedule for: ' + match[1] + '...');
  const result = await askAI(
    `You are a content planning expert. Create 4-week content calendar for "${match[1]}" YouTube channel.
    For each week:
    - 3 video topics
    - Best upload days/times
    - Content themes
    - Growth strategy
    Reply in same language as the topic.`
  );
  await sendMessage(msg.chat.id, '📅 Content Calendar:\n\n' + result);
});

// /plan
bot.onText(/\/plan (.+)/, async (msg, match) => {
  await sendMessage(msg.chat.id, '💼 Creating business plan for: ' + match[1] + '...');
  const result = await askAI(
    `You are a business strategist. Create detailed business plan for: "${match[1]}"
    Include:
    1. Business Overview
    2. Revenue Streams
    3. Target Market
    4. Competition Analysis
    5. Marketing Strategy
    6. 90-day Action Plan
    7. Investment needed
    8. Expected ROI
    Reply in same language as the topic.`
  );
  await sendMessage(msg.chat.id, '💼 Business Plan:\n\n' + result);
});

// /content
bot.onText(/\/content (.+)/, async (msg, match) => {
  await sendMessage(msg.chat.id, '✍️ Creating content for: ' + match[1] + '...');
  const result = await askAI(
    `You are a content creation expert. Create for "${match[1]}":
    1. Blog Post (500 words)
    2. Instagram Caption (with hashtags)
    3. Twitter/X Thread (5 tweets)
    4. YouTube Description
    Reply in same language as the topic.`
  );
  await sendMessage(msg.chat.id, '✍️ Content Package:\n\n' + result);
});

// /monetize
bot.onText(/\/monetize (.+)/, async (msg, match) => {
  await sendMessage(msg.chat.id, '💰 Finding monetization for: ' + match[1] + '...');
  const result = await askAI(
    `You are a digital monetization expert. Give monetization strategies for "${match[1]}":
    1. Direct Revenue Methods
    2. Affiliate Marketing opportunities
    3. Sponsorship potential
    4. Digital Products ideas
    5. Monthly income potential
    6. How to start earning in 30 days
    Reply in same language as the topic.`
  );
  await sendMessage(msg.chat.id, '💰 Monetization Plan:\n\n' + result);
});

// /thumbnail
bot.onText(/\/thumbnail (.+)/, async (msg, match) => {
  await sendMessage(msg.chat.id, '🎨 Creating thumbnail ideas for: ' + match[1] + '...');
  const result = await askAI(
    `You are a YouTube thumbnail expert. For "${match[1]}" create:
    1. 5 Thumbnail Concepts
    2. Best Colors to use
    3. Text for thumbnail (max 5 words)
    4. Emotion to convey
    5. Background style
    Reply in same language as the topic.`
  );
  await sendMessage(msg.chat.id, '🎨 Thumbnail Ideas:\n\n' + result);
});

// /email
bot.onText(/\/email (.+)/, async (msg, match) => {
  await sendMessage(msg.chat.id, '📧 Creating email templates for: ' + match[1] + '...');
  const result = await askAI(
    `You are an email marketing expert. Create 3 email templates for "${match[1]}":
    1. Welcome Email
    2. Promotional Email
    3. Follow-up Email
    Each with subject line, body, and CTA.
    Reply in same language as the topic.`
  );
  await sendMessage(msg.chat.id, '📧 Email Templates:\n\n' + result);
});

// /instagram
bot.onText(/\/instagram (.+)/, async (msg, match) => {
  await sendMessage(msg.chat.id, '📱 Creating Instagram pack for: ' + match[1] + '...');
  const result = await askAI(
    `You are an Instagram marketing expert. Create Instagram content pack for "${match[1]}":
    1. 5 Post Captions with emojis
    2. 30 Hashtags
    3. 3 Story ideas
    4. 2 Reel concepts
    5. Bio suggestion
    Reply in same language as the topic.`
  );
  await sendMessage(msg.chat.id, '📱 Instagram Pack:\n\n' + result);
});

// /income
bot.onText(/\/income (.+)/, async (msg, match) => {
  await sendMessage(msg.chat.id, '💵 Calculating income for: ' + match[1] + '...');
  const result = await askAI(
    `You are a digital income expert. Calculate income potential for "${match[1]}":
    1. Month 1-3 (Starting)
    2. Month 4-6 (Growth)
    3. Month 7-12 (Scaling)
    4. Year 2+ (Established)
    5. Multiple revenue streams
    6. Investment needed
    7. Break-even point
    Reply in same language as the topic.`
  );
  await sendMessage(msg.chat.id, '💵 Income Calculator:\n\n' + result);
});

// /website
bot.onText(/\/website (.+)/, async (msg, match) => {
  await sendMessage(msg.chat.id, '🌐 Creating website plan for: ' + match[1] + '...');
  const result = await askAI(
    `You are a web design expert. Create website plan for "${match[1]}":
    1. Website Structure
    2. Homepage content
    3. Key features
    4. Color scheme
    5. Call-to-action strategy
    6. SEO keywords
    7. Free tools to build it
    Reply in same language as the topic.`
  );
  await sendMessage(msg.chat.id, '🌐 Website Plan:\n\n' + result);
});

// /analytics
bot.onText(/\/analytics (.+)/, async (msg, match) => {
  await sendMessage(msg.chat.id, '📊 Analyzing: ' + match[1] + '...');
  const result = await askAI(
    `You are a YouTube analytics expert. For "${match[1]}" channel/niche provide:
    1. Key metrics to track
    2. Growth benchmarks
    3. Engagement rate targets
    4. Best posting frequency
    5. Audience retention tips
    6. Revenue milestones
    7. Tools to use for analytics
    Reply in same language as the topic.`
  );
  await sendMessage(msg.chat.id, '📊 Analytics Guide:\n\n' + result);
});

// /motivate
bot.onText(/\/motivate/, async (msg) => {
  const result = await askAI(
    `You are a motivational coach for digital entrepreneurs.
    Give a powerful motivational message for someone building their digital empire.
    Include:
    1. Inspiring quote
    2. Daily action steps
    3. Mindset tip
    4. Success reminder
    Make it energetic and actionable!
    Reply in Hinglish (mix of Hindi and English).`
  );
  await sendMessage(msg.chat.id, '🔔 Daily Motivation:\n\n' + result);
});

// /reply
bot.onText(/\/reply (.+)/, async (msg, match) => {
  await sendMessage(msg.chat.id, '💬 Creating reply for: ' + match[1] + '...');
  const result = await askAI(
    `You are a communication expert. Create professional replies for this situation: "${match[1]}"
    Provide:
    1. Formal reply
    2. Friendly reply
    3. Short reply
    4. Detailed reply
    Reply in same language as the situation.`
  );
  await sendMessage(msg.chat.id, '💬 Reply Templates:\n\n' + result);
});

// /agent
bot.onText(/\/agent/, (msg) => {
  sendMessage(msg.chat.id,
    '🤖 AI God System Agents:\n\n' +
    '🧠 Master Agent - Controls everything\n' +
    '🔍 Research Agent - Market analysis\n' +
    '📝 Content Agent - Creates content\n' +
    '🎬 Script Agent - YouTube scripts\n' +
    '💡 Ideas Agent - Viral ideas\n' +
    '🎯 SEO Agent - Titles & tags\n' +
    '📅 Schedule Agent - Content calendar\n' +
    '💼 Business Agent - Business plans\n' +
    '💰 Monetize Agent - Money strategies\n' +
    '🎨 Design Agent - Thumbnail ideas\n' +
    '📧 Email Agent - Email templates\n' +
    '📱 Instagram Agent - Social content\n' +
    '💵 Income Agent - Income calculator\n' +
    '🌐 Website Agent - Website plans\n' +
    '📊 Analytics Agent - Growth metrics\n' +
    '🔔 Motivate Agent - Daily motivation\n' +
    '💬 Reply Agent - Smart replies\n\n' +
    'Total: 17 Agents Active! 🔱'
  );
});

// Any message
bot.on('message', async (msg) => {
  if (!msg.text) return;
  if (msg.text.startsWith('/')) return;
  const result = await askAI(
    `You are Master AI Agent of a digital empire system.
    User said: "${msg.text}"
    Give helpful detailed response.
    Reply in same language as user.`
  );
  await sendMessage(msg.chat.id, result);
});

app.get('/', (req, res) => res.send('🔱 AI God System Running!'));
app.listen(process.env.PORT || 3000, () => console.log('✅ AI God System Started!'));

import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Gemini API SDK on server-side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Personal Chatbot Endpoint for Logged-In YMI Researchers
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, userProfile, currentDossierContext } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages format' });
    }

    const userName = userProfile?.name || 'YMI Researcher';
    const userRole = userProfile?.roleTitle || 'Verified Researcher';
    const clearance = userProfile?.clearanceLevel || 1;

    const systemInstruction = `You are the YMI Cybernetic Intelligence Assistant (مساعد الذكاء السيبراني), an advanced personal AI companion dedicated to supporting researcher ${userName} (${userRole}, Clearance Level ${clearance}) at the Yaqoob Mosafa Institute (YMI).

Your Core Duties:
1. Provide deep, rigorous, and insightful analytical support on non-linear dynamics, chaos theory, strange attractors, epistemic philosophy, Axcelnetics (Akselnetika), stochastic resonance, and complex systems.
2. Maintain a professional, erudite, and respectful tone appropriate for a senior Institute intelligence partner.
3. Be helpful, concise, and structured in your explanations. Use clear Markdown headers, mathematical notation where relevant, and bullet points.
4. Respond strictly in English (UK Global) or Arabic according to the user's query language.
${currentDossierContext ? `\nCurrent Active Document Context:\n${JSON.stringify(currentDossierContext)}` : ''}`;

    // Format contents for Gemini
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    // If API key is not present, provide a helpful simulated response
    if (!process.env.GEMINI_API_KEY) {
      const lastUserMsg = messages[messages.length - 1]?.content || '';
      return res.json({
        reply: `[YMI Personal Intelligence Node - Local Standby]\n\nGreetings, ${userName} (${userRole}). I have processed your query: "${lastUserMsg}".\n\nTo activate full online neural synthesis, ensure your GEMINI_API_KEY environment variable is configured. In local standby mode, I am ready to assist with your personal works, dossier curation, and theoretical formulation.`,
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || 'I have analyzed your query but generated no textual output.';
    return res.json({ reply: replyText });
  } catch (err: any) {
    console.error('Gemini Chat API Error:', err);
    return res.status(500).json({
      error: 'Failed to process chat query',
      details: err.message || String(err),
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();

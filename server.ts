import express from "express";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { db } from "./server/db";
import { initCronJobs } from "./server/cron";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Background Engine
  initCronJobs();

  // ==========================================
  // 🤖 AI ROUTES
  // ==========================================
  app.post("/api/ai/generate", async (req, res) => {
    try {
      const { topic, tone, length, includeCta, useEmojis, temperature } = req.body;
      
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(400).json({ error: "Gemini API Key is missing. Please configure it in the AI Studio Secrets panel." });
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const lengthMap: Record<number, string> = {
        1: "Short (1-2 concise paragraphs)",
        2: "Medium (3-4 paragraphs, well-spaced)",
        3: "Long (Deep dive, 5+ paragraphs, highly detailed)"
      };

      const prompt = `
        You are an elite, highly engaging social media manager for a premium Facebook page.
        Write a high-converting Facebook post based on the following strict parameters:
        
        - Core Topic: ${topic || "General motivation and consistency"}
        - Tone of Voice: ${tone}
        - Desired Length: ${lengthMap[length]}
        - Include Call to Action (CTA): ${includeCta ? "Yes, end with a strong question or directive." : "No CTA."}
        - Use Emojis: ${useEmojis ? "Yes, use them strategically but don't overdo it." : "No emojis at all."}

        CRITICAL INSTRUCTIONS:
        - Do NOT include any surrounding quotes.
        - Do NOT include markdown formatting like \`\`\` text.
        - Return ONLY the raw post content ready to be copy-pasted.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: { temperature: temperature || 0.7 }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("AI Generation Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // ==========================================
  // ⚙️ SETTINGS ROUTES
  // ==========================================
  app.get("/api/settings", (req, res) => {
    try {
      const stmt = db.prepare('SELECT * FROM system_settings');
      const rows = stmt.all() as any[];
      const settings = rows.reduce((acc, row) => ({ ...acc, [row.key]: row.value }), {});
      res.json(settings);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/settings", (req, res) => {
    try {
      const settings = req.body;
      const stmt = db.prepare('INSERT OR REPLACE INTO system_settings (key, value) VALUES (?, ?)');
      const insertMany = db.transaction((settingsObj) => {
        for (const [key, value] of Object.entries(settingsObj)) {
          if (value !== undefined && value !== null) {
            stmt.run(key, String(value));
          }
        }
      });
      insertMany(settings);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ==========================================
  // 📘 FACEBOOK OAUTH ROUTES
  // ==========================================
  app.get("/api/auth/url", (req, res) => {
    // Get from DB first, fallback to env
    const stmt = db.prepare("SELECT value FROM system_settings WHERE key = 'FB_CLIENT_ID'");
    const dbClientId = stmt.get() as { value: string } | undefined;
    const clientId = dbClientId?.value || process.env.FB_CLIENT_ID;
    
    // The redirect URI must exactly match what is configured in the Facebook App
    // We use the referer or a provided host to construct the dynamic URL
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const redirectUri = `${protocol}://${host}/auth/callback`;

    if (!clientId) {
      return res.status(500).json({ error: "FB_CLIENT_ID is not configured in environment variables." });
    }

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      state: 'vt_auth_state',
      scope: 'pages_manage_posts,pages_read_engagement,pages_show_list',
      response_type: 'code',
    });

    res.json({ url: `https://www.facebook.com/v19.0/dialog/oauth?${params.toString()}` });
  });

  app.get(["/auth/callback", "/auth/callback/"], async (req, res) => {
    const { code, error } = req.query;
    
    if (error) {
      return res.send(`
        <html><body><script>
          if (window.opener) { window.opener.postMessage({ type: 'OAUTH_ERROR', error: '${error}' }, '*'); window.close(); }
        </script></body></html>
      `);
    }

    // In a real app, we would exchange the 'code' for an access token here.
    // For this prototype, we will simulate success and notify the parent window.
    res.send(`
      <html>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({ 
                type: 'OAUTH_AUTH_SUCCESS', 
                payload: { pageId: '1048291048', pageName: 'Valleytainment', token: 'mock_long_lived_token' } 
              }, '*');
              window.close();
            } else {
              window.location.href = '/';
            }
          </script>
          <p>Authentication successful. This window should close automatically.</p>
        </body>
      </html>
    `);
  });

  // ==========================================
  // 📅 POST SCHEDULING ROUTES
  // ==========================================
  app.post("/api/posts/schedule", (req, res) => {
    try {
      const { content, scheduledTime } = req.body;
      const stmt = db.prepare('INSERT INTO scheduled_posts (content, scheduled_time) VALUES (?, ?)');
      const info = stmt.run(content, scheduledTime);
      res.json({ success: true, id: info.lastInsertRowid });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/posts", (req, res) => {
    const stmt = db.prepare('SELECT * FROM scheduled_posts ORDER BY scheduled_time DESC');
    const posts = stmt.all();
    res.json(posts);
  });

  // ==========================================
  // ⚡ VITE MIDDLEWARE (Must be last)
  // ==========================================
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

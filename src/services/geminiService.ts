/**
 * ============================================================================
 * 🧠 GEMINI AI SERVICE
 * ============================================================================
 * Description: Handles all interactions with the Google Gemini API.
 * Features: Prompt engineering, error handling, and type-safe responses.
 * ============================================================================
 */

import { GoogleGenAI } from "@google/genai";

// 🔑 Initialize the SDK using the environment variable injected by Vite
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

/**
 * 📝 Generate Facebook Post
 * ----------------------------------------------------------------------------
 * Constructs a highly specific prompt based on user parameters and calls Gemini.
 * 
 * @param topic - The core idea or subject of the post.
 * @param tone - The desired voice (e.g., motivational, professional).
 * @param length - 1 (Short), 2 (Medium), or 3 (Long).
 * @param includeCta - Whether to append a Call to Action.
 * @param useEmojis - Whether to sprinkle emojis throughout the text.
 * @returns The generated post content as a string.
 */
export async function generateFacebookPost(
  topic: string, 
  tone: string, 
  length: number, 
  includeCta: boolean, 
  useEmojis: boolean
): Promise<string> {
  // 🚨 Guardrail: Check for API Key
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Gemini API Key is missing. Please configure it in the AI Studio Secrets panel.");
  }

  // 📏 Map length slider value to actual instructions
  const lengthMap: Record<number, string> = {
    1: "Short (1-2 concise paragraphs)",
    2: "Medium (3-4 paragraphs, well-spaced)",
    3: "Long (Deep dive, 5+ paragraphs, highly detailed)"
  };

  // 🧠 Prompt Engineering
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
    - Ensure the formatting has good line breaks for readability on mobile devices.
  `;

  try {
    // 🎛️ Retrieve dynamic temperature from LocalStorage
    const storedTemp = window.localStorage.getItem("vt_ai_temp");
    const temperature = storedTemp ? parseFloat(storedTemp) : 0.7;

    // 🚀 Execute API Call
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: temperature,
      }
    });

    return response.text || "Error: Received empty response from AI.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to generate content. Please try again.");
  }
}

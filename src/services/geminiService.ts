/**
 * ============================================================================
 * 🧠 GEMINI AI SERVICE (CLIENT)
 * ============================================================================
 * Description: Calls the local backend API to generate content.
 * ============================================================================
 */

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
  // 🎛️ Retrieve dynamic temperature from LocalStorage
  const storedTemp = window.localStorage.getItem("vt_ai_temp");
  const temperature = storedTemp ? parseFloat(storedTemp) : 0.7;

  try {
    const response = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        topic,
        tone,
        length,
        includeCta,
        useEmojis,
        temperature
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to generate content.");
    }

    const data = await response.json();
    return data.text;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to generate content. Please try again.");
  }
}

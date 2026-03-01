/**
 * ============================================================================
 * 📘 FACEBOOK SERVICE (CLIENT)
 * ============================================================================
 * Description: Handles scheduling posts to the local database.
 * ============================================================================
 */

export async function schedulePost(content: string, scheduledTime: string) {
  const response = await fetch('/api/posts/schedule', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, scheduledTime })
  });

  if (!response.ok) {
    throw new Error("Failed to schedule post.");
  }

  return response.json();
}

export async function getScheduledPosts() {
  const response = await fetch('/api/posts');
  return response.json();
}

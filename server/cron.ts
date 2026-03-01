import cron from 'node-cron';
import { db } from './db';

export function initCronJobs() {
  // Run every minute to check for scheduled posts
  cron.schedule('* * * * *', async () => {
    console.log('🕒 [Cron] Checking for scheduled posts...');
    
    const now = new Date().toISOString();
    
    // Find pending posts that are due
    const stmt = db.prepare(`
      SELECT * FROM scheduled_posts 
      WHERE status = 'pending' AND scheduled_time <= ?
    `);
    const duePosts = stmt.all(now) as any[];

    for (const post of duePosts) {
      console.log(`🚀 [Cron] Publishing post ID: ${post.id}`);
      
      try {
        // Get Facebook credentials from DB
        const settingsStmt = db.prepare('SELECT * FROM system_settings');
        const rows = settingsStmt.all() as any[];
        const settings = rows.reduce((acc, row) => ({ ...acc, [row.key]: row.value }), {});
        
        const pageId = settings.FACEBOOK_PAGE_ID || process.env.FACEBOOK_PAGE_ID;
        const accessToken = settings.FACEBOOK_PAGE_ACCESS_TOKEN || process.env.FACEBOOK_PAGE_ACCESS_TOKEN;

        let fbPostId = `simulated_${Math.random().toString(36).substring(7)}`;

        if (pageId && accessToken) {
          // Make real Facebook Graph API call
          console.log(`🌐 [Cron] Sending to Facebook Graph API for Page ID: ${pageId}`);
          const response = await fetch(`https://graph.facebook.com/v19.0/${pageId}/feed`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              message: post.content,
              access_token: accessToken
            })
          });

          const data = await response.json();
          
          if (!response.ok) {
            throw new Error(data.error?.message || "Unknown Facebook API Error");
          }
          
          fbPostId = data.id;
          console.log(`✅ [Cron] Real Facebook Post created: ${fbPostId}`);
        } else {
          console.log(`⚠️ [Cron] No Facebook credentials found. Simulating successful post.`);
        }
        
        const updateStmt = db.prepare(`
          UPDATE scheduled_posts 
          SET status = 'published', fb_post_id = ? 
          WHERE id = ?
        `);
        updateStmt.run(fbPostId, post.id);
        
        console.log(`✅ [Cron] Successfully processed post ID: ${post.id}`);
      } catch (error) {
        console.error(`❌ [Cron] Failed to publish post ID: ${post.id}`, error);
        const errorStmt = db.prepare(`UPDATE scheduled_posts SET status = 'failed' WHERE id = ?`);
        errorStmt.run(post.id);
      }
    }
  });
}

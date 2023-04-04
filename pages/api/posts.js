import { savePost } from "../../lib/posts-db";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Process a POST request
        const { id, title, content } = req.body;
        try{
          await savePost(id, title, content, false);
          res.status(200).json({ success: true });
        }
        catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
  }
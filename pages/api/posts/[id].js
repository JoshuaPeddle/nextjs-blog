import { getPostData } from "../../../lib/posts-db";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;
    const post = await getPostData(id);
    res.status(200).json(post);
  }
}
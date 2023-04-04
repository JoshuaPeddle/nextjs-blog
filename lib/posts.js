import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import html from 'remark-html';

import { clientPromise, dbName } from './mongodb';
import { ObjectId } from 'mongodb';

export async function getSortedPostsData() {
  const client = await clientPromise;
  const db = client.db(dbName);
  const posts = await db.collection('Posts').find({}).toArray();
  const returnPosts = await Promise.all(posts.map(async (post) => {
    const processedContent = await remark()
      .use(html)
      .use(remarkGfm)
      .process(post.content);
    const contentHtml = processedContent.toString();
    return {
      id: post._id.toString(),
      title: post.title,
      contentHtml: contentHtml,
      content: post.content,
      date: post.PublishDate
    };
  }));
  return returnPosts.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getAllPostIds() {

  //   const client = await clientPromise;
  //   const db = client.db(dbName);

//   const posts = await db.collection('Posts').find({}).toArray().map((post) => {
//     return {
//       params: {
//         id: post._id
//       }
//     };
//   }
//   );
}

export async function getPostData(id) {
  const client = await clientPromise;
  const db = client.db(dbName);
  const postArray = await db.collection('Posts').find({ _id: new ObjectId(id) }).toArray();
  if (postArray.length == 0) {
    return null;
  }
  const post = postArray[0];
  const processedContent = await remark()
    .use(html)
    .use(remarkGfm)
    .process(post.content);
  const contentHtml = processedContent.toString();
  return {
    id: post._id.toString(),
    title: post.title,
    contentHtml: contentHtml,
    content: post.content,
    date: post.PublishDate
  };
}

export async function savePost(id, title, content) {
  // ID is not used for the DB conversion. Kept to keep API the same as the original.
  const client = await clientPromise;
  const db = client.db(dbName);
  // Check if the post already exists (overwrite is deprecated. All posts are overwritten if they exist.)
  if (id != '') {
    const post = getPostData(id);
    if (post != null) {
      db.collection('Posts').updateOne({ _id: new ObjectId(id) }, {
        $set: {
          title: title,
          content: content
        }
      });
      return;
    }
  }
  const date = new Date().toISOString().slice(0, 10);
  db.collection('Posts').insertOne({
    title: title,
    content: content,
    PublishDate: date
  });
}

export async function deletePostData(id) {
  const client = await clientPromise;
  const db = client.db(dbName);
  console.log('Deleting post from DB');
  console.log(id);
  db.collection('Posts').deleteOne({ _id: new ObjectId(id) });
}
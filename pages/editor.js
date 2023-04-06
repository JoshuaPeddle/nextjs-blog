import Layout from '../components/layout';
import Head from 'next/head';
import MDEeditor from '../components/editor';
import { getSortedPostsData } from '../lib/posts';

import { useSession, signIn} from 'next-auth/react';

export async function getServerSideProps() {
  const allPostsData = await getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Editor({ allPostsData }) {
  useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      signIn();
    },
  });
  return (
    <Layout>
      <Head></Head>
      <MDEeditor allPostsData={allPostsData} />
    </Layout>
  );
}
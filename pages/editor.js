import Layout from '../components/layout';
import Head from 'next/head';
import MDEeditor from '../components/editor';
import { getSortedPostsData } from '../lib/posts';

import { useSession, signIn, signOut } from 'next-auth/react';

export async function getServerSideProps() {
  const allPostsData = await getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Editor({ allPostsData }) {
  const { data: session } = useSession();
  if (session) {
    return (
      <Layout>
        <Head></Head>
        <MDEeditor allPostsData={allPostsData} />
        <button onClick={() => signOut()}>Sign out</button>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <Head></Head>
        <button onClick={() => signIn()}>Sign in</button>
      </Layout>
    );
  }
}
import Layout from '../components/layout';
import Head from 'next/head';
import MDEeditor from '../components/editor';
import { getSortedPostsData } from '../lib/posts';

import { useSession, signIn} from 'next-auth/react';

export async function getServerSideProps() {
  const allPostsData = await getSortedPostsData();
  const isTesting = process.env.TEST;
  return {
    props: {
      allPostsData,
      isTesting,
    },
  };
}

export default function Editor({ allPostsData, isTesting }) {
  if (isTesting == 'true') {
    return (
      <Layout>
        <Head></Head>
        <MDEeditor allPostsData={allPostsData} />
      </Layout>
    );
  }
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      signIn();
    },
  });
  if (status === 'authenticated') {
    return (
      <Layout>
        <Head></Head>
        <MDEeditor allPostsData={allPostsData} />
      </Layout>
    );
  } else {
    return (
      <>

      </>
    );
  }
}
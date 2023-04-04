import Layout from '../components/layout';
import Head from 'next/head';
import MDEeditor from '../components/editor';
import { getSortedPostsData } from '../lib/posts';

export async function getServerSideProps() {
  const allPostsData = await getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Editor({ allPostsData }) {
  return (
    <Layout>
      <Head></Head>
      <MDEeditor allPostsData={allPostsData} />
    </Layout>
  );
}
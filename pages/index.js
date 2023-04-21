import clientPromise from '../lib/mongodb';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import BlogList from '../components/BlogList';

export async function getServerSideProps() {
  try {
    await clientPromise;
    const allPostsData = await getSortedPostsData();
    return {
      props: {
        isConnected: true,
        allPostsData,
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        isConnected: false,
      },
    };
  }
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>

        <BlogList allPostsData={allPostsData}/>
      </section>
    </Layout>
  );
}
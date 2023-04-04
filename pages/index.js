import Head from 'next/head';
import Link from 'next/link';
import Date from '../components/date';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';

import clientPromise from '../lib/mongodb';

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
        <h2 className={utilStyles.headingLg}></h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title, contentHtml }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={{pathname:`/posts/${id}`, query: {id, date, title, contentHtml}}}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
import Layout from '../../components/layout';
import Head from 'next/head';
import Date from '../../components/date';

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

import utilStyles from '../../styles/utils.module.css';




export default function Post() {

  const router = useRouter()
  const { id } = router.query
  const [postData, setPostData] = useState({})

  useEffect(() => {
    if(!id) return
    async function fetchPosts() {
      await fetch('/api/posts/' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        if (response.status === 200) {
          const data = response.json().then((data) => {
            setPostData(data)
          });
        } 
      })
    }
    fetchPosts()

  }, [id, router])

  if (!postData.title) {
    return <Layout>Loading...</Layout>
  }

  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
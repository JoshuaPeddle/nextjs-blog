import Layout from '../components/layout';
import Head from 'next/head';
import MDEeditor from "../components/editor";
import {getSortedPostsData} from '../lib/posts-db'


export async function getServerSideProps(context) {
    const allPostsData = await getSortedPostsData()
    return {
        props: {
            allPostsData
        }
    }
}
export default function Editor() {
    return (
        <Layout><Head></Head>  <MDEeditor /> </Layout>
       
    );
}
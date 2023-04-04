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
        <MDEeditor />  
    );
}
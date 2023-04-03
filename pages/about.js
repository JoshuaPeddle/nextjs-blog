import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';

export default function About() {


    return (
        <Layout about>

            <h1>About</h1>

            <p>
                I'm a software engineer from the United States. I'm currently working at <Link href="https://www.uber.com">Uber</Link> as a software engineer. I'm also a <Link href="https://www.github.com/joshuapeddle">Github</Link> contributor.
            </p>
        </Layout>

    )
}
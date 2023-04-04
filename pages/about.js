import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';

export default function About() {

    return (
        <Layout about>
            <h1>About</h1>
            <p>
                I'm a software developer from Canada. I studied computer science at Memorial University. I'm also a <Link href="https://www.github.com/joshuapeddle">Github</Link> contributor.
            </p>
        </Layout>

    )
}
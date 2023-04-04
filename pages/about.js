import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';

export default function About() {

    return (
        <Layout about>
            <h1>About</h1>
            <p>
                Hi, I'm Josh Peddle, a passionate software developer based in Canada. I graduated with a degree in computer science from Memorial University, where I honed my skills in programming and software development. I'm also an active Github contributor, working on a variety of projects in my spare time.
            <p>
            </p>
                As a developer, I'm most passionate about building scalable, high-performance applications that make a difference in people's lives. I'm always eager to learn new programming languages and technologies, and I enjoy collaborating with other developers to bring innovative ideas to life.
            </p>
            <p>
                If you're interested in connecting with me or learning more about my work, please feel free to connect with me on LinkedIn. Thanks for stopping by!
            </p>
        </Layout>

    )
}
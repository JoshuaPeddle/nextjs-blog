import Link from 'next/link';

import styles from './footer.module.css';

export default function Footer({is_home}){

    if (is_home) return (
        <footer className={styles.footer}>
            <Link href="/about">About</Link>
            <Link href="https://www.github.com/joshuapeddle">Github</Link>
            <Link href="/editor">Editor</Link>
        </footer>
    )


    return (
        <footer className={styles.footer}>
            <Link href="/">← Back to home</Link>
            <Link href="/about">About</Link>
            <Link href="https://www.github.com/joshuapeddle">Github</Link>
            <Link href="/editor">Editor</Link>
        </footer>
    )
}
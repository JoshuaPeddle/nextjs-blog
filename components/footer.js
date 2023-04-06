import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import styles from './footer.module.css';

export default function Footer({ is_home }) {
  const { status } = useSession({});
  if (is_home) return (
    <footer className={styles.footer}>
      <Link href="/about">About</Link>
      <Link href="https://www.github.com/joshuapeddle">Github</Link>
      <Link href="/editor">Editor</Link>
      {status === 'authenticated' ? (
        <button onClick={() => signOut()}>Sign out</button>
      ) : (null)}
    </footer>
  );
  return (
    <footer className={styles.footer}>
      <Link href="/">← Back to home</Link>
      <Link href="/about">About</Link>
      <Link href="https://www.github.com/joshuapeddle">Github</Link>
      {status === 'authenticated' ? (
        <button onClick={() => signOut({callbackUrl: '/'})}>Sign out</button>
      ) : (
        <Link href="/editor">Editor</Link>
      )}
    </footer>
  );
}


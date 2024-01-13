import styles from "./Nav.module.css";
import Link from "next/link"

export default function Nav() {
  return (
    <>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/">home</Link>
          </li>
          <li>
            <Link href="/about">about</Link>
          </li>
          <li>
            <Link href="/blog">blog</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

import styles from './Nav.module.css'

export default function Nav() {
  return (
    <>
      <nav className={styles.nav}>
        <ul>
          <li>
            <a href="/">home</a>
          </li>
          <li>
            <a href="/about">about</a>
          </li>
          <li>
            <a href="/blog">blog</a>
          </li>
        </ul>
        <a href="/">
          <img src="../avatar.webp" />
        </a>
      </nav>
    </>
  );
}
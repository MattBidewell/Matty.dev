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
        </ul>
        <img src="../avatar.png"/>
      </nav>
    </>
  )
}
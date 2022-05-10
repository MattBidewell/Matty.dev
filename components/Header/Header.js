import styles from './Header.module.css'

export default function Header() {
  return (
    <>
      <h1 className={styles.header}>Hello 👋🏻</h1>
      <h2 className={styles.header}>I'm Matt Bidewell</h2>
      <h2 className={styles.header}>Software Engineer in London 👨‍💻</h2>
    </>
  );
}

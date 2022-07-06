import styles from './main.module.css'

export default function Header() {
  return (
    <>
      <h1 className={styles.main}>Hello 👋🏻</h1>
      <h2 className={styles.main}>I'm Matt Bidewell!</h2>
      <h2 className={styles.main}>Software Engineer in London 👨‍💻</h2>
    </>
  );
}

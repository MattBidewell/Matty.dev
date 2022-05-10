import styles from './Header.module.css'

export default function Header() {
  return (
    <>
      <h1 class={styles.header}>Hello 👋🏻</h1>
      <h2 class={styles.header}>I'm Matt Bidewell</h2>
      <h2 class={styles.header}>Software Engineer in London 👨‍💻</h2>
    </>
  );
}

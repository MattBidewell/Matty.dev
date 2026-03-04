import styles from "./main.module.css";
import Nav from "../nav/Nav";

export default function TopContent() {
  return (
    <header className={styles.header}>
      <aside className={styles.navRail}>
        <Nav />
      </aside>
      <div className={styles.identity}>
        <h1 className={styles.name}>
          Matt Bidewell<span className={styles.cursor}>_</span>
        </h1>
        <p className={styles.subtitle}>Software Engineer</p>
      </div>
    </header>
  );
}

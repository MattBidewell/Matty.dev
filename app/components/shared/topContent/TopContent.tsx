import styles from "./main.module.css";
import Nav from "../nav/Nav";

export default function TopContent() {
  return (
    <header className={styles.header}>
      <h1 className={styles.name}>
        Matt Bidewell<span className="cursor">_</span>
      </h1>
      <Nav />
    </header>
  );
}

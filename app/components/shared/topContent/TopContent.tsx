import styles from "./main.module.css";
import Nav from "../nav/Nav";

export default function TopContent() {
  return (
    <>
      <div className={styles.flex_container}>
        <div className={styles.flex_child}>
          <h1 className={styles.main}>Hello 👋🏻</h1>
          <h2 className={styles.main}>I&apos;m Matt Bidewell</h2>
          <h2 className={styles.main}>A software engineer in London 👨‍💻</h2>
        </div>
        <Nav />
      </div>
    </>
  );
}

import { Link } from "next-view-transitions";
import styles from "./Content.module.css";

export default function Content() {
  return (
    <section className={styles["intro-content"]}>
      <h2>Hi, I&apos;m Matt 👋</h2>
      <p>
        a software engineer passionate about software engineering and open
        source software
      </p>
      <p>
        Find out more <Link href="/about">about me</Link> or read my{" "}
        <Link
          target="_blank"
          rel="noopener"
          href="assets/resume/matt-bidewell-resume.pdf"
        >
          resume
        </Link>
        .
      </p>
    </section>
  );
}

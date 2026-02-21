import styles from "./Footer.module.css";
import Analytics from "../meta/Analytics";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.links}>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/MattBidewell"
          >
            github
          </Link>
          <span className={styles.separator}>·</span>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://x.com/MattBidewell"
          >
            x
          </Link>
          <span className={styles.separator}>·</span>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/matt-bidewell-a4578790/"
          >
            linkedin
          </Link>
          <span className={styles.separator}>·</span>
          <Link
            target="_blank"
            rel="noopener"
            href="assets/resume/matt-bidewell-resume.pdf"
          >
            resume
          </Link>
        </div>
        <div className={styles.copyright}>
          <span>© {new Date().getFullYear()} Matt Bidewell</span>
        </div>
        <div className={styles.meta_data}>
          <span>BUILD_TIME: {process.env.STAMP}</span>
        </div>
      </footer>
      <Analytics />
    </>
  );
}

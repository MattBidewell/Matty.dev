import styles from "./Footer.module.css";
import Analytics from "../meta/Analytics";
import ThemeSwitch from "./ThemeSwitch";
import Link from "next/link";

export default function Footer() {

  return (
    <>
      <footer className={styles.footer}>
        <div className="theme-container">
          <p>
            <strong>Theme | </strong>
            <span className={`${styles["theme-link"]} theme`} data-theme="light">
              Light
            </span>{" "}
            |&nbsp;
            <span className={`${styles["theme-link"]} theme`} data-theme="dark">
              Dark
            </span>
          </p>
        </div>
        <div className={styles.links}>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/MattBidewell"
          >
            Github
          </Link>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/MattBidewell"
          >
            Twitter
          </Link>
          <Link rel="me" href="https://fosstodon.org/@MattBidewell">
            Mastodon
          </Link>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/matt-bidewell-a4578790/"
          >
            Linkedin
          </Link>
          <Link
            target="_blank"
            rel="noopener"
            href="assets/resume/matt-bidewell-resume.pdf"
          >
            Resume
          </Link>
        </div>
        <div>
          <p>© {new Date().getFullYear()} Matt Bidewell</p>
        </div>
        <div className={styles.meta_data}>
          <p style={{margin: 0}}>BUILD_TIME: {process.env.STAMP}</p>
          {/* <p style={{margin: 0}}>BUILD_ID: {process.env.BUILD_ID}</p> */}
          {/* <p style={{margin: 0}}>NODE_VERSION: {process.env.NODE_VERSION}</p> */}
        </div>
      </footer>
      <ThemeSwitch />
      <Analytics />
    </>
  );
}

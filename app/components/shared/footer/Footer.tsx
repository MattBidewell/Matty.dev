import styles from "./Footer.module.css";
import Analytics from "../meta/Analytics";
import ThemeSwitch from "./ThemeSwitch";
import Link from "next/link";

export default function Footer() {

  const envs = process.env;
  console.log(envs);

  return (
    <>
      <footer className={styles.footer}>
        <div className="theme-container">
          <p>
            <strong>Theme | </strong>
            <span className="theme" data-theme="light">
              Light
            </span>{" "}
            |&nbsp;
            <span className="theme" data-theme="dark">
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
          <p>© 2022 Matt Bidewell</p>
        </div>
        <div className={styles.timestamp}>
          <p>Build time: {process.env.STAMP}</p>
          <p>Build id: {process.env.BUILD_ID}</p>
        </div>
      </footer>
      <ThemeSwitch />
      <Analytics />
    </>
  );
}

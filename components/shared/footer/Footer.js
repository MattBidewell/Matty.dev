import styles from './Footer.module.css'
import Analytics from "../meta/Analytics"
import ThemeSwitch from "./ThemeSwitch";

export default function Footer() {
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
          <a
            target="_blank"
            rel="noopener"
            href="https://github.com/MattBidewell"
          >
            Github
          </a>
          <a
            target="_blank"
            rel="noopener"
            href="https://twitter.com/MattBidewell"
          >
            Twitter
          </a>
          <a
            target="_blank"
            rel="noopener"
            href="https://www.linkedin.com/in/matt-bidewell-a4578790/"
          >
            Linkedin
          </a>
          <a
            target="_blank"
            rel="noopener"
            href="assets/resume/matt-bidewell-resume.pdf"
          >
            Resume
          </a>
          <p>© 2022 Matt Bidewell</p>
        </div>
      </footer>
      <ThemeSwitch />
      <Analytics />
    </>
  );
}

import styles from './Footer.module.css'
import Analytics from "../meta/Analytics"


export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
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
        <p>© 2022 Matt Bidewell</p>
      </footer>
      <Analytics />
    </>
  );
}

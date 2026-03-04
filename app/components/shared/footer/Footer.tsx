import styles from "./Footer.module.css";
import Analytics from "../meta/Analytics";
import { Link } from "next-view-transitions";
import ThemeSwitch from "./ThemeSwitch";

export default function Footer() {
  const buildStamp = process.env.STAMP ?? "local-dev";

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.leftColumn}>
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
          <div className={`theme-container ${styles.themeContainer}`}>
            <span className={styles.themeLabel}>palette</span>
            <div className={styles.themeButtons}>
              <button type="button" className={`theme ${styles.themeButton}`} data-theme="graphite-cyan">cyan</button>
              <button type="button" className={`theme ${styles.themeButton}`} data-theme="carbon-lime">lime</button>
              <button type="button" className={`theme ${styles.themeButton}`} data-theme="night-ops">amber</button>
              <button type="button" className={`theme ${styles.themeButton}`} data-theme="slate-blue">blue</button>
              <button type="button" className={`theme ${styles.themeButton}`} data-theme="obsidian-paper">paper</button>
            </div>
          </div>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.metaPanel}>
            <div className={styles.metaRow}>
              <span className={styles.metaKey}>build</span>
              <span className={styles.metaValue}>{buildStamp}</span>
            </div>
            <div className={styles.metaRow}>
              <span className={styles.metaKey}>runtime</span>
              <span className={styles.metaValue}>next.js / react</span>
            </div>
            <div className={styles.metaRow}>
              <span className={styles.metaKey}>focus</span>
              <span className={styles.metaValue}>software engineering + ai</span>
            </div>
          </div>
        </div>
      </footer>
      <ThemeSwitch />
      <Analytics />
    </>
  );
}

import styles from "./PostFooter.module.css";
import Link from 'next/link'

export default function PostFooter() {
  return (
    <div className={styles["post-footer"]}>
      <Link
        className={styles["coffee-link"]}
        href="https://www.buymeacoffee.com/Mattbidewell"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src="../assets/images/misc/buy-me-a-coffee.webp"
          alt="Buy Me A Coffee"
          className={styles.coffee}
        />
      </Link>
      <p>
        Found my content useful and want to help support me? Consider&nbsp;
        <Link href="https://www.buymeacoffee.com/Mattbidewell">
          buying me a coffee.
        </Link>
      </p>
    </div>
  );
}

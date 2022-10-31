import styles from "./PostFooter.module.css";

export default function PostFooter() {
  return (
    <div className={styles["post-footer"]}>
      <a
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
      </a>
      <p>
        Found my content useful and want to help support me? Consider&nbsp;
        <a href="https://www.buymeacoffee.com/Mattbidewell">
          buying me a coffee.
        </a>
      </p>
    </div>
  );
}

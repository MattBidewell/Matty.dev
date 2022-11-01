import styles from "./PostFooter.module.css";
import Link from "next/link"
import Image from "next/image"
import buyMeCoffeeIm from "../../../../public/assets/images/misc/buy-me-a-coffee.webp";

export default function PostFooter() {
  return (
    <div className={styles["post-footer"]}>
      <Link
        className={styles["coffee-link"]}
        href="https://www.buymeacoffee.com/Mattbidewell"
        target="_blank"
        rel="noreferrer"
      >
      <Image
          src={buyMeCoffeeIm}
          alt="'Buy Me A Coffee' logo"
          className={styles.coffee}
          placeholder="blur"
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

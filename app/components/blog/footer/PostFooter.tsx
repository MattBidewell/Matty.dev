import styles from "./PostFooter.module.css";
import { Link } from "next-view-transitions";
import Image from "next/image";
import buyMeCoffeeIm from "../../../../public/assets/images/misc/buy-me-a-coffee.webp";

export default function PostFooter({
  shareUrl,
  shareTitle,
}: {
  shareUrl?: string;
  shareTitle?: string;
}) {
  const encodedUrl = shareUrl ? encodeURIComponent(shareUrl) : "";
  const encodedTitle = shareTitle ? encodeURIComponent(shareTitle) : "";

  return (
    <div className={styles["post-footer"]}>
      {shareUrl && shareTitle && (
        <div className={styles["share-links"]}>
          <span className={styles["share-label"]}>share</span>
          <Link
            href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
            target="_blank"
            rel="noreferrer"
          >
            x
          </Link>
          <span className={styles.separator}>·</span>
          <Link
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            target="_blank"
            rel="noreferrer"
          >
            linkedin
          </Link>
        </div>
      )}
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

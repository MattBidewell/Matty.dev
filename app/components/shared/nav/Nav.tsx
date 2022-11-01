import styles from "./Nav.module.css";
import Link from "next/link"
import Image from "next/image"
import Avatar from "../../../../public/avatar.webp"

export default function Nav() {
  return (
    <>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/">home</Link>
          </li>
          <li>
            <Link href="/about">about</Link>
          </li>
          <li>
            <Link href="/blog">blog</Link>
          </li>
        </ul>
        <Link href="/">
          <Image alt="Illustration of a red haired man" src={Avatar} placeholder="blur" />
        </Link>
      </nav>
    </>
  );
}

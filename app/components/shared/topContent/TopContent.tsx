import styles from "./main.module.css";
import Nav from "../nav/Nav";
import Link from "next/link";
import Image from "next/image";
import Avatar from "../../../../public/avatar.webp"

export default function TopContent() {
  return (
    <>
      <div className={styles.flex_container}>
        <Link href="/">
          <Image alt="Illustration of a red haired man" src={Avatar} placeholder="blur" />
        </Link>
        <Nav />
        <div className={styles.flex_child}>
          <h1 className={styles.main}>Matt Bidewell</h1>
        </div>
      </div>
    </>
  );
}

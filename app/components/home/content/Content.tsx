import Link from "next/link";
import styles from "./Content.module.css";

export default function Content() {
  const emoji = randomEmoji();

  return (
    <>
      <section className={styles["intro-content"]}>
        <h2>{emoji}</h2>
        <p>
          I’m a software engineer that is passionate about open source software
          and software engineering, with 7+ years of experience in creating
          well-crafted SaaS solutions in the cloud ☁️.
        </p>
        <p>
          Find out more <Link href="/about">about me</Link> or read my{" "}
          <Link
            target="_blank"
            rel="noopener"
            href="assets/resume/matt-bidewell-resume.pdf"
          >
            Resume.
          </Link>
        </p>
      </section>
    </>
  );
}

function randomEmoji() {
  const emojis = [
    "💀",
    "☠️",
    "💩",
    "🤡",
    "👹",
    "👺",
    "👻",
    "👽",
    "👾",
    "🤖",
    "👋",
    "🤏",
    "🖖",
    "🤘",
    "🤟",
    "🧠",
    "👨‍🎤",
    "🕵️",
    "📷",
    "🐕",
  ];
  return emojis[Math.floor(Math.random() * Math.floor(emojis.length))];
}

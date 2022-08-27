import styles from "./Content.module.css";

export default function Content() {
  return (
    <>
      <section className={styles["intro-content"]}>
        <h2>{randomEmoji()}</h2>
        I’m a software engineer that is passionate about open source software
        and software engineering, with 7+ years of experience in creating
        well-crafted SaaS solutions in the cloud ☁️.
      </section>
    </>
  );
}

function randomEmoji() {
  const emojis = ["💀","☠️","💩","🤡","👹","👺","👻","👽","👾","🤖","👋","🤏","🖖","🤘","🤟","🧠","👨‍🎤","🕵️","📷","🐕"];
  return emojis[Math.floor(Math.random() * Math.floor(emojis.length))];
}

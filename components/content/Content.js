import styles from "./Content.module.css";

export default function Content() {
  return (
    <>
      <section className={styles.content}>
        <p>
          I'm Matthew Bidewell, I'm a Software engineer with 7 years of
          experience in creating well crafted SaaS solutions using AWS. I work
          over at Government Digital Services where I help build Digital
          Identification. 🧑‍💻
        </p>
        <p>
          I'm also passionate about cyber security and you can find me hacking
          away at Hack the Box. 📦
        </p>
        <p>
          You can find me on Twitter, scrutinise my code at Github or get in
          touch via LinkedIn.
        </p>
      </section>
    </>
  );
}
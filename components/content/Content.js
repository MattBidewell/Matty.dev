import styles from "./Content.module.css";

export default function Content() {
  return (
    <>
      <section className={styles.content}>
        <p>
          I'm Matthew Bidewell, I'm a Software engineer with 7 years of
          experience in creating well crafted SaaS solutions using AWS. I work
          over at <a href="https://www.gov.uk/">Government Digital Services</a>y
          where I help build Digital Identification. 🧑‍💻
        </p>
        <p>
          I'm also passionate about cyber security and you can find me hacking
          away at Hack the Box. 📦
        </p>
        <p>
          You can find me on <a href="">Twitter</a>, scrutinise my code at{" "}
          <a href="">Github</a> or get in touch via <a href="">LinkedIn</a>.
        </p>
      </section>
    </>
  );
}

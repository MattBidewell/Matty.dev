import styles from "./Content.module.css";

export default function Content() {
  return (
    <>
      <section className={styles.content}>
        <p>
          I'm Matt Bidewell, I'm a Software engineer with {`${new Date().getFullYear() - 2015}`}+ years of
          experience in creating well crafted SaaS solutions in the cloud ☁️. I work over
          at <a href="https://www.gov.uk/">Government Digital Services</a> where
          I help build the future of Digital Identification. 🧑‍💻
        </p>
        <p>
          You can find me on <a href="https://twitter.com/MattBidewell">Twitter</a>, scrutinise my code at{" "}
          <a href="https://www.github.com/mattbidewell">Github</a> or get in
          touch via <a href="https://www.linkedin.com/in/matt-bidewell-a4578790/">LinkedIn</a>.
        </p>
      </section>
    </>
  );
}

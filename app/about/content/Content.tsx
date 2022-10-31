import Skills from "./Skills";

export default function Content() {
  return (
    <>
      <section className="content">
        <h2>About me</h2>
        <p>
          I&apos;m Matt Bidewell, I’m a jack of all trades software engineer
          that is passionate about open source software and developing in the
          open, with {`${new Date().getFullYear() - 2015}`}+ years of experience
          in creating well-crafted SaaS solutions in the cloud ☁️ for both the
          public and private sectors. I&apos;m currently working over at{" "}
          <a target="_blank" rel="noreferrer" href="https://www.gov.uk/">
            Government Digital Services
          </a>{" "}
          where I&apos;m building the future of Digital Identification.🧑‍💻
        </p>
        <p>
          You can find me on{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/MattBidewell"
          >
            Twitter
          </a>
          , scrutinise my code at{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.github.com/mattbidewell"
          >
            Github
          </a>{" "}
          or get in touch via{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/matt-bidewell-a4578790/"
          >
            LinkedIn
          </a>
          .
        </p>
        <Skills />
        <p>
          <a
            target="_blank"
            rel="noopener"
            href="assets/resume/matt-bidewell-resume.pdf"
          >
            Check out my full Resume here
          </a>
        </p>
      </section>
    </>
  );
}

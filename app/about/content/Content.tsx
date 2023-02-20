import Skills from "./Skills";
import Link from 'next/link'

export default function Content() {
  return (
    <>
      <section className="content">
        <h2>About me</h2>
        <p>
          I&apos;m Matt Bidewell, I’m a jack of all trades software engineer
          that is passionate about open source software and developing in the
          open, with {`${new Date().getFullYear() - 2015}`}+ years of experience
          in creating well-crafted SaaS solutions in the cloud ☁️. I&apos;m currently a Senior Software Engineer over at{" "}
          <Link target="_blank" rel="noreferrer" href="https://beamery.com/">
            Beamery
          </Link>.
        </p>
        <p>
          You can find me on{" "}
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/MattBidewell"
          >
            Twitter
          </Link>
          , scrutinise my code at{" "}
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.github.com/mattbidewell"
          >
            Github
          </Link>{" "}
          or get in touch via{" "}
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/matt-bidewell-a4578790/"
          >
            LinkedIn
          </Link>
          .
        </p>
        <Skills />
        <p>
          <Link
            target="_blank"
            rel="noopener"
            href="assets/resume/matt-bidewell-resume.pdf"
          >
            Check out my full Resume here
          </Link>
        </p>
      </section>
    </>
  );
}

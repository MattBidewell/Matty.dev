import Link from "next/link";

export default function Content() {
  return (
    <section className="content">
      <h2>About</h2>
      <p>
        I&apos;m Matt Bidewell, a software engineer with {`${new Date().getFullYear() - 2015}`}+
        years of experience building products on the web.
      </p>
      <p>
        I currently work as a Senior Software Engineer at{" "}
        <Link target="_blank" rel="noreferrer" href="https://beamery.com/">
          Beamery
        </Link>
        , and I enjoy shipping reliable systems, writing clearly, and working in
        the open.
      </p>
      <p>
        You can find me on{" "}
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://bsky.app/profile/mattbidewell.bsky.social"
        >
          Bluesky
        </Link>
        , browse my work on{" "}
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.github.com/mattbidewell"
        >
          GitHub
        </Link>
        , or connect via{" "}
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/matt-bidewell-a4578790/"
        >
          LinkedIn
        </Link>
        .
      </p>
      <p>
        <Link
          target="_blank"
          rel="noopener"
          href="assets/resume/matt-bidewell-resume.pdf"
        >
          View resume
        </Link>
      </p>
    </section>
  );
}

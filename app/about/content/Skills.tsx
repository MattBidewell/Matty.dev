import styles from "./Skills.module.css";

export default function Skills() {
  return (
    <>
      <h3>Current Skills</h3>
      <p>Skills that I&apos;m currently actively using in my current job or in my personal projects.</p>
      {generateCurrentSkills()}
      <h3>Other skills</h3>
      <p>Skills that I might not be using day to day, but have a history of using.</p>
      {generateOtherSkills()}
      <p>to name just a few</p>
    </>
  );
}

function generateCurrentSkills() {
  const currentSkills = ["NodeJS", "GoLang", "AWS", "GCP", "Cloudformation", "Terraform", "Kubernetes", "Serverless", "TDD", "BDD", "Unit Testing"]

  const set1 = currentSkills.slice(0, Math.ceil(currentSkills.length / 2));
  const set2 = currentSkills.slice(Math.ceil(currentSkills.length / 2), currentSkills.length);

  const col1 = set1.map((skill) => {
    return (
      <>
        <li>{skill}</li>
      </>
    )
  })

  const col2 = set2.map((skill) => {
    return (
      <>
        <li>{skill}</li>
      </>
    )
  })

  return (
    <>
      <div className={styles.container}>
        <div className={styles.item}>
          <ul>
            {col1}
          </ul>
        </div>
        <div className={styles.item}>
          <ul>
            {col2}
          </ul>
        </div>
      </div>
      </>
  )
}

function generateOtherSkills() {
  const otherSkills = ["HTML", "CSS", "Javascript", "NextJS", "Nunjucks", "Java", "Python"];

  const set1 = otherSkills.slice(0, Math.ceil(otherSkills.length / 2));
  const set2 = otherSkills.slice(Math.ceil(otherSkills.length / 2), otherSkills.length);

  const col1 = set1.map((skill) => {
    return (
      <>
        <li>{skill}</li>
      </>
    )
  })

  const col2 = set2.map((skill) => {
    return (
      <>
        <li>{skill}</li>
      </>
    )
  })

  return (
    <>
      <div className={styles.container}>
        <div className={styles.item}>
          <ul>
            {col1}
          </ul>
        </div>
        <div className={styles.item}>
          <ul>
            {col2}
          </ul>
        </div>
      </div>
      </>
  )
}

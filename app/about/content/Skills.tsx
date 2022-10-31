import styles from "./Skills.module.css";

export default function Skills() {
  return (
    <>
      <h3>Skills</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Category</th>
            <th>Skill</th>
          </tr>
        </thead>
        <tbody>{generateSkills()}</tbody>
      </table>
    </>
  );
}

function generateSkills() {
  const skills = {
    Cloud: ["AWS"],
    IaC: ["Cloudformation", "Terraform"],
    Backend: ["NodeJS", "Go", "Java", "Python", "Bash/sh"],
    Frontend: ["HTML", "CSS", "Javascript", "ReactJS", "NextJS", "Nunjucks"],
    "CI/CD": ["Bitbucket Pipelines", "Github Actions", "CodeDeploy"],
    Miscellaneous: [
      "Serverless",
      "TDD",
      "BDD",
      "Unit Testing",
      "Browser Testing",
    ],
  };

  const output = Object.keys(skills).map((keyStr) => {
    const key = keyStr as keyof typeof skills;

    const category = (
      <>
        <td>{key}</td>
      </>
    );

    const skill = (
      <td>
        <ul>
          {skills[key].map((skill) => {
            return <li key={skill}> {skill} </li>;
          })}
        </ul>
      </td>
    );

    return (
      <>
        <tr>
          {category}
          {skill}
        </tr>
      </>
    );
  });
  return output;
}

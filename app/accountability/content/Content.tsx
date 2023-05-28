import Chart from "./Chart";

export default function Content() {
  return (
    <>
      <section className="content">
        <h2>My Accountability</h2>
        <p>
          // EDIT This following page is my effort to be more accountable for
          some lifestyle changes I need to make. The following data I plan to
          collect as and when I can so gaps might appear during times of
          breaks/holidays.
        </p>
        <p>
          Some backstory. Since I was teenager, I've had a reoccuring issue
          relating to my esophagus. I decided to finally take some action to
          investiage the issue, however this exposed another issue. My blood
          pressure is/was through the roof. Changes are needed.
        </p>
        <p>My plan is to collect the following data:</p>
        <ul>
          <li>Weight</li>
          <li>Blood Pressure</li>
        </ul>
        <p>
          Raw data can be <a href="#">found here</a>
        </p>
        <h2>Overall</h2>
        <Chart title="Blood Pressure" />
        <h2>Weight</h2>
        <div></div>
      </section>
    </>
  );
}

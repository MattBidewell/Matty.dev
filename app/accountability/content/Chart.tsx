import d3 from "d3";

export default function Chart({ title }) {
  return (
    <>
      <h2>{title}</h2>
      <section className="content"></section>
    </>
  );
}

function loadCSV(path) {
  const basePath = "public/data/";
  const url = `${basePath}${path}`;
  // return d3.csv(url);
}

loadCsv("data.csv");

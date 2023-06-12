import Script from "next/script";

export default function Analytics() {
  return (
    <>
      <script
        async
        defer
        src="https://beampipe.io/js/tracker.js"
        data-beampipe-domain="www.matty.dev"
      ></script>
    </>
  );
}

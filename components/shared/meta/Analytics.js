import Script from "next/script";

export default function Analytics() {

  return (
    <>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=UA-102064957-3"/>
      <Script id="google-analytics" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'GA_MEASUREMENT_ID');
      `}
      </Script>
    </>
  )
}
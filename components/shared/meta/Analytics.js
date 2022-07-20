import Script from "next/script";

export default function Analytics() {

  return (
    <>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-JJN8TB4HQ4"/>
      <Script id="google-analytics" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-JJN8TB4HQ4');
      `}
      </Script>
    </>
  )
}
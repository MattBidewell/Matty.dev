import Script from "next/script";

export default function ThemeSwitch() {
  return (
    <>
      <Script strategy="afterInteractive">
        {`(() => {
              const themeContainer = document.querySelector(".theme-container");

              if (!themeContainer) return;

              const themes = document.querySelectorAll(".theme");

              for (const theme of themes) {
                theme.addEventListener("click", function (e) {
                  if (!e || !e.target) return;

                  const themeValue = e.target.getAttribute("data-theme");

                  document.documentElement.setAttribute("data-theme", themeValue);
                });
              }
        })()
      `}
      </Script>
    </>
  );
}

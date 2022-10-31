import Script from "next/script";

export default function ThemeSwitch() {
  return (
    <>
      <Script strategy="afterInteractive" id="theme-switch">
        {`(() => {
          function setThemeFromStorage() {
              if (!localStorage) return;

              const setTheme = localStorage.getItem("theme");

              if(setTheme) {
                document.documentElement.setAttribute("data-theme", setTheme);
              }
          }

          function setThemeListeners() {
            const themes = document.querySelectorAll(".theme");

            for (const theme of themes) {
              theme.addEventListener("click", function (e) {
                if (!e || !e.target) return;

                const themeValue = e.target.getAttribute("data-theme");

                document.documentElement.setAttribute("data-theme", themeValue);
                localStorage.setItem("theme", themeValue)
              });
            }
          }

          const themeContainer = document.querySelector(".theme-container");
          if (!themeContainer) return;
          setThemeFromStorage();
          setThemeListeners();
        })()
      `}
      </Script>
    </>
  );
}

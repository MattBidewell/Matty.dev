import Script from "next/script";

export default function ThemeSwitch() {
  return (
    <>
      <Script strategy="afterInteractive" id="theme-switch">
        {`(() => {
          const defaultTheme = "graphite-cyan";
          const validThemes = new Set([
            "graphite-cyan",
            "carbon-lime",
            "night-ops",
            "slate-blue",
            "obsidian-paper"
          ]);

          function setActiveThemeButton(theme) {
            const themes = document.querySelectorAll(".theme");
            for (const themeButton of themes) {
              const isActive = themeButton.getAttribute("data-theme") === theme;
              themeButton.classList.toggle("is-active", isActive);
              themeButton.setAttribute("aria-pressed", isActive ? "true" : "false");
            }
          }

          function applyTheme(theme) {
            const resolvedTheme = validThemes.has(theme) ? theme : defaultTheme;
            document.documentElement.setAttribute("data-theme", resolvedTheme);
            localStorage.setItem("theme", resolvedTheme);
            setActiveThemeButton(resolvedTheme);
          }

          function setThemeFromStorage() {
              if (!localStorage) return;

              const setTheme = localStorage.getItem("theme") || defaultTheme;
              applyTheme(setTheme);
          }

          function setThemeListeners() {
            const themes = document.querySelectorAll(".theme");

            for (const themeButton of themes) {
              themeButton.addEventListener("click", function (e) {
                if (!e || !e.currentTarget) return;

                const themeValue = e.currentTarget.getAttribute("data-theme");
                if (!themeValue) return;
                applyTheme(themeValue);
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

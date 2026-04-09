"use client";

import { useEffect, useState } from "react";
import styles from "./Footer.module.css";

type ThemePreference = "light" | "dark";

const STORAGE_KEY = "theme-preference";
const TRANSITION_CLASS = "theme-changing";

function getResolvedTheme(): ThemePreference {
  if (typeof window === "undefined") {
    return "light";
  }

  const explicitTheme = document.documentElement.dataset.theme;
  if (explicitTheme === "light" || explicitTheme === "dark") {
    return explicitTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemePreference>("light");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const syncTheme = () => setTheme(getResolvedTheme());

    syncTheme();
    mediaQuery.addEventListener("change", syncTheme);

    return () => mediaQuery.removeEventListener("change", syncTheme);
  }, []);

  const setThemePreference = (nextTheme: ThemePreference) => {
    document.documentElement.classList.add(TRANSITION_CLASS);
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem(STORAGE_KEY, nextTheme);
    setTheme(nextTheme);

    window.setTimeout(() => {
      document.documentElement.classList.remove(TRANSITION_CLASS);
    }, 250);
  };

  return (
    <div className={styles.themeToggle} role="group" aria-label="Theme switcher">
      <button
        type="button"
        className={`${styles.themeButton} ${theme === "light" ? styles.themeButtonActive : ""}`}
        aria-pressed={theme === "light"}
        onClick={() => setThemePreference("light")}
      >
        light
      </button>
      <span className={styles.separator}>/</span>
      <button
        type="button"
        className={`${styles.themeButton} ${theme === "dark" ? styles.themeButtonActive : ""}`}
        aria-pressed={theme === "dark"}
        onClick={() => setThemePreference("dark")}
      >
        dark
      </button>
    </div>
  );
}

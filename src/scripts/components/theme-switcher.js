import { getLocalItem, setLocalItem } from "../services/storage.js";

const STORAGE_KEY = "start-color-theme";

export function initThemeSwitcher() {
  const themeToggler = document.getElementById("themeToggler");
  if (!themeToggler) {
    return;
  }

  const darkSchemeMedia = window.matchMedia("(prefers-color-scheme: dark)");
  const storedTheme = getLocalItem(STORAGE_KEY);
  const initialTheme =
    storedTheme ?? (darkSchemeMedia.matches ? "dark" : "light");

  const applyTheme = (theme) => {
    const isDark = theme === "dark";
    document.documentElement.dataset.theme = theme;
    themeToggler.classList.toggle("toggle__btn--active", isDark);
    themeToggler.setAttribute("aria-pressed", isDark ? "true" : "false");
  };

  applyTheme(initialTheme);

  themeToggler.addEventListener("toggle:change", (event) => {
    const isDark = event.detail?.pressed === true;
    const theme = isDark ? "dark" : "light";
    applyTheme(theme);
    setLocalItem(STORAGE_KEY, theme);
  });

  darkSchemeMedia.addEventListener("change", (event) => {
    if (getLocalItem(STORAGE_KEY)) {
      return;
    }

    applyTheme(event.matches ? "dark" : "light");
  });
}

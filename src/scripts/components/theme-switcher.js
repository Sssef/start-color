export function initThemeSwitcher() {
  const themeToggler = document.getElementById("themeToggler");
  if (!themeToggler) return;

  const STORAGE_KEY = "start-color-theme";
  const darkSchemeMedia = window.matchMedia("(prefers-color-scheme: dark)");

  // Читаем тему, уже установленную inline-скриптом
  const currentTheme = document.documentElement.dataset.theme || "light";
  const isDark = currentTheme === "dark";

  // Синхронизируем внешний вид тоггла
  themeToggler.classList.toggle("toggle__btn--active", isDark);
  themeToggler.setAttribute("aria-pressed", isDark ? "true" : "false");

  // Обработчик переключения
  themeToggler.addEventListener("toggle:change", (event) => {
    const nextIsDark = event.detail?.pressed === true;
    const nextTheme = nextIsDark ? "dark" : "light";

    document.documentElement.dataset.theme = nextTheme;
    themeToggler.classList.toggle("toggle__btn--active", nextIsDark);
    themeToggler.setAttribute("aria-pressed", nextIsDark ? "true" : "false");

    try {
      localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {}
  });

  // Следим за системной темой ТОЛЬКО если пользователь явно не выбрал свою
  darkSchemeMedia.addEventListener("change", (e) => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        const theme = e.matches ? "dark" : "light";
        document.documentElement.dataset.theme = theme;
        themeToggler.classList.toggle("toggle__btn--active", e.matches);
        themeToggler.setAttribute("aria-pressed", e.matches ? "true" : "false");
      }
    } catch {}
  });
}

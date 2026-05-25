import { onDocumentReady } from "../utils/dom.js";
import { initHeaderMenu } from "../components/header-menu.js";
import { initLangPicker } from "../components/lang-picker.js";
import { initToggles } from "../components/toggle.js";
import { initThemeSwitcher } from "../components/theme-switcher.js";
import { getSessionItem, removeSessionItem, setSessionItem } from "../services/storage.js";

function initErrorPage() {
  const requestIdValue = document.getElementById("error-request-id-value");
  if (requestIdValue && requestIdValue.textContent === "req_...") {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).slice(2, 8);
    requestIdValue.textContent = `req_${timestamp}_${random}`;
  }

  const requestCode = document.getElementById("error-request-id");
  if (requestCode && requestIdValue) {
    const copyId = async () => {
      try {
        await navigator.clipboard.writeText(requestIdValue.textContent);
        const original = requestIdValue.textContent;
        requestIdValue.textContent = "Скопировано ✓";
        setTimeout(() => {
          requestIdValue.textContent = original;
        }, 1500);
      } catch {
        // Clipboard API may fail in insecure context.
      }
    };

    requestCode.addEventListener("click", copyId);
    requestCode.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        copyId();
      }
    });
  }

  if (document.querySelector(".error-page__code")?.textContent !== "500") {
    return;
  }

  const attemptsKey = "start-color-500-attempts";
  const attempts = Number(getSessionItem(attemptsKey) || 0);

  if (attempts >= 3) {
    removeSessionItem(attemptsKey);
    return;
  }

  setTimeout(async () => {
    try {
      const response = await fetch(window.location.href, {
        method: "HEAD",
        cache: "no-store",
      });

      if (!response.ok) {
        return;
      }

      setSessionItem(attemptsKey, String(attempts + 1));
      window.location.reload();
    } catch {
      // Ignore network errors for soft retry.
    }
  }, 30_000);
}

onDocumentReady(() => {
  initHeaderMenu();
  initLangPicker();
  initToggles();
  initThemeSwitcher();
  initErrorPage();
});

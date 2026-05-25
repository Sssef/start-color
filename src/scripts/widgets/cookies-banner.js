import { getLocalJSON, removeLocalItem, setLocalJSON } from "../services/storage.js";
import { onDocumentReady } from "../utils/dom.js";

const STORAGE_KEY = "start-color-cookies-consent";
const CONSENT_VERSION = "1.0";

function hideBanner(banner) {
  banner.classList.remove("cookies-banner--enter");
  banner.classList.add("cookies-banner--exit");

  const onEnd = () => {
    banner.hidden = true;
    banner.classList.remove("cookies-banner--exit");
    banner.removeEventListener("animationend", onEnd);
  };

  banner.addEventListener("animationend", onEnd);
}

function readConsent() {
  const data = getLocalJSON(STORAGE_KEY);
  if (
    typeof data?.accepted !== "boolean" ||
    typeof data?.version !== "string"
  ) {
    return null;
  }

  return data;
}

function saveConsent(accepted) {
  setLocalJSON(STORAGE_KEY, {
    accepted,
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
  });
}

function applyConsent(accepted) {
  document.documentElement.dataset.cookiesConsent = accepted ? "accepted" : "declined";

  if (accepted) {
    // Hook for analytics initialization.
  }
}

function initCookiesBanner() {
  const banner = document.getElementById("cookiesBanner");
  if (!banner) {
    return;
  }

  const acceptBtn = banner.querySelector('[data-cookies-action="accept"]');
  const declineBtn = banner.querySelector('[data-cookies-action="decline"]');
  if (!acceptBtn || !declineBtn) {
    return;
  }

  const existingConsent = readConsent();
  if (existingConsent && existingConsent.version === CONSENT_VERSION) {
    applyConsent(existingConsent.accepted);
    return;
  }

  requestAnimationFrame(() => {
    banner.hidden = false;
    void banner.offsetHeight;
    banner.classList.add("cookies-banner--enter");
  });

  const handleChoice = (accepted) => {
    saveConsent(accepted);
    applyConsent(accepted);
    hideBanner(banner);

    window.dispatchEvent(
      new CustomEvent("cookies:consent", {
        detail: { accepted, version: CONSENT_VERSION },
      }),
    );
  };

  acceptBtn.addEventListener("click", () => handleChoice(true));
  declineBtn.addEventListener("click", () => handleChoice(false));

  banner.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      handleChoice(false);
    }
  });
}

window.CookiesConsent = {
  isAccepted: () => readConsent()?.accepted === true,
  reset: () => {
    removeLocalItem(STORAGE_KEY);
    delete document.documentElement.dataset.cookiesConsent;
  },
};

onDocumentReady(initCookiesBanner);

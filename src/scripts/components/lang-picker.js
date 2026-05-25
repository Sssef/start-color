import { getLocalItem, setLocalItem } from "../services/storage.js";

const STORAGE_KEY = "start-color-language";

function normalizeLanguage(lang) {
  return String(lang || "")
    .trim()
    .toLowerCase();
}

export function initLangPicker() {
  const picker = document.getElementById("languagePicker");
  if (!picker || picker.dataset.langPickerInitialized === "true") {
    return;
  }

  picker.dataset.langPickerInitialized = "true";

  const trigger = document.getElementById("languagePickerButton");
  const list = document.getElementById("languagePickerList");
  const valueNode = document.getElementById("languagePickerValue");
  const options = Array.from(
    picker.querySelectorAll(".lang-picker__option[data-lang]"),
  );

  if (!trigger || !list || !valueNode || !options.length) {
    return;
  }

  const getOptionByLang = (lang) =>
    options.find((option) => normalizeLanguage(option.dataset.lang) === lang);

  const closeList = () => {
    list.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
  };

  const openList = () => {
    list.hidden = false;
    trigger.setAttribute("aria-expanded", "true");
  };

  const setSelectedLanguage = (lang) => {
    const normalized = normalizeLanguage(lang);
    const selectedOption = getOptionByLang(normalized);
    if (!selectedOption) {
      return;
    }

    options.forEach((option) => {
      const isSelected = option === selectedOption;
      option.setAttribute("aria-selected", isSelected ? "true" : "false");
      option.tabIndex = isSelected ? 0 : -1;
    });

    valueNode.textContent =
      selectedOption.textContent?.trim().toUpperCase() || "RU";
    document.documentElement.lang = normalized;
    document.documentElement.dir = normalized === "ar" ? "rtl" : "ltr";
    setLocalItem(STORAGE_KEY, normalized);

    window.dispatchEvent(
      new CustomEvent("language:change", {
        detail: { lang: normalized },
      }),
    );
  };

  const initialLang =
    normalizeLanguage(getLocalItem(STORAGE_KEY)) ||
    normalizeLanguage(document.documentElement.lang) ||
    normalizeLanguage(
      options.find((option) => option.getAttribute("aria-selected") === "true")
        ?.dataset.lang,
    ) ||
    "ru";

  setSelectedLanguage(initialLang);
  closeList();

  trigger.addEventListener("click", () => {
    if (list.hidden) {
      openList();
      return;
    }

    closeList();
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      setSelectedLanguage(option.dataset.lang);
      closeList();
      trigger.focus();
    });
  });

  document.addEventListener("click", (event) => {
    if (!picker.contains(event.target)) {
      closeList();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !list.hidden) {
      closeList();
      trigger.focus();
    }
  });
}

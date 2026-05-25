import { onDocumentReady } from "../utils/dom.js";
import { initHeaderMenu } from "../components/header-menu.js";
import { initLangPicker } from "../components/lang-picker.js";
import { initToggles } from "../components/toggle.js";
import { initThemeSwitcher } from "../components/theme-switcher.js";

onDocumentReady(() => {
  initHeaderMenu();
  initLangPicker();
  initToggles();
  initThemeSwitcher();
});

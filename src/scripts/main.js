import { onDocumentReady } from "./utils/dom.js";
import { mockData } from "./services/mock-api.js";
import { initHeaderMenu } from "./components/header-menu.js";
import { initLangPicker } from "./components/lang-picker.js";
import {
  initResponsiveAccordions,
  initTariffsAccordionPopup,
} from "./components/accordion.js";
import { initToggles, initTariffsToggle } from "./components/toggle.js";
import { initThemeSwitcher } from "./components/theme-switcher.js";
import initLiveAICounter from "./widgets/ai-counter.js";
import initAnalyticsCharts from "./widgets/analytics-charts.js";
import { initModalForm } from "./widgets/form-modal.js";
import initToolsCarousel from "./carousels/tools-carousel.js";
import initNewsCarousel from "./carousels/news-carousel.js";
import initPressCarousel from "./carousels/press-carousel.js";
import initTariffsCarousel from "./carousels/tariffs-carousel.js";

import "./widgets/cookies-banner.js";

onDocumentReady(() => {
  initHeaderMenu();
  initLangPicker();
  initResponsiveAccordions();
  initTariffsAccordionPopup();
  initToggles();
  initThemeSwitcher();
  initTariffsToggle();
  initModalForm("requestModal");
  initLiveAICounter();
  initToolsCarousel(mockData);
  initAnalyticsCharts();
  initNewsCarousel();
  initPressCarousel();
  initTariffsCarousel();
});

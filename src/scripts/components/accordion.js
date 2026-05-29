export function initResponsiveAccordions() {
  const accordions = Array.from(
    document.querySelectorAll(".accordion--mobile"),
  );
  if (!accordions.length) {
    return;
  }

  const mobileMedia = window.matchMedia("(max-width: 991.98px)");

  accordions.forEach((accordion) => {
    const isInitiallyOpen = accordion.classList.contains("accordion--open");
    accordion.dataset.initiallyOpen = isInitiallyOpen ? "true" : "false";
  });

  const syncAccordionState = () => {
    const isMobile = mobileMedia.matches;

    accordions.forEach((accordion) => {
      const isTariffsAccordion =
        accordion.classList.contains("tariffs__accordion");
      const toggleButton = accordion.querySelector("button");
      if (!toggleButton) {
        return;
      }

      if (isMobile || isTariffsAccordion) {
        const shouldBeOpen =
          accordion.dataset.userOpen ??
          accordion.dataset.initiallyOpen ??
          "false";
        const isOpen = shouldBeOpen === "true";

        accordion.classList.toggle("accordion--open", isOpen);
        toggleButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
        return;
      }

      accordion.classList.add("accordion--open");
      toggleButton.setAttribute("aria-expanded", "true");
    });
  };

  const sectionContents = document.querySelectorAll(".section__content");
  sectionContents.forEach((content) => {
    content.addEventListener("click", (event) => {
      const toggleButton = event.target.closest(".accordion--mobile button");
      if (!toggleButton) {
        return;
      }

      const accordion = toggleButton.closest(".accordion--mobile");
      if (!accordion) {
        return;
      }

      const isTariffsAccordion =
        accordion.classList.contains("tariffs__accordion");
      if (!mobileMedia.matches && !isTariffsAccordion) {
        return;
      }

      const isOpen = accordion.classList.toggle("accordion--open");
      accordion.dataset.userOpen = isOpen ? "true" : "false";
      toggleButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  });

  if (typeof mobileMedia.addEventListener === "function") {
    mobileMedia.addEventListener("change", syncAccordionState);
  }

  syncAccordionState();
}

/**
 * Закрывает попап-аккордеон при клике вне его области
 */
export function initTariffsAccordionPopup() {
  const popups = document.querySelectorAll(
    ".tariffs__accordion.accordion--mobile",
  );

  document.addEventListener("click", (e) => {
    popups.forEach((accordion) => {
      const body = accordion.querySelector(".accordion__body");
      const toggle = accordion.querySelector(".accordion__toggle");

      // Если клик не по аккордеону и он открыт → закрываем
      if (
        !accordion.contains(e.target) &&
        accordion.classList.contains("accordion--open")
      ) {
        accordion.classList.remove("accordion--open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  });
}

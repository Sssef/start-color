export function initToggles() {
  const toggles = document.querySelectorAll(".toggle__btn");
  if (!toggles.length) {
    return;
  }

  toggles.forEach((element) => {
    const isActive = element.classList.contains("toggle__btn--active");
    if (!element.hasAttribute("aria-pressed")) {
      element.setAttribute("aria-pressed", isActive ? "true" : "false");
    }

    element.addEventListener("click", () => {
      const nextPressed = !element.classList.contains("toggle__btn--active");
      const beforeChangeEvent = new CustomEvent("toggle:beforechange", {
        cancelable: true,
        detail: { pressed: nextPressed, element },
      });

      if (!element.dispatchEvent(beforeChangeEvent)) {
        return;
      }

      element.classList.toggle("toggle__btn--active", nextPressed);
      element.setAttribute("aria-pressed", nextPressed ? "true" : "false");
      element.dispatchEvent(
        new CustomEvent("toggle:change", {
          detail: { pressed: nextPressed, element },
        }),
      );
    });
  });
}

export function initTariffsToggle() {
  const toggler = document.getElementById("tariffsToggler");
  const sideCards = document.querySelectorAll(".tariff-left, .tariff-right");
  if (!toggler || !sideCards.length) {
    return;
  }

  const desktopMedia = window.matchMedia("(min-width: 748px)");

  const syncState = () => {
    if (!desktopMedia.matches) {
      sideCards.forEach((card) => card.removeAttribute("inert"));
      toggler.classList.remove("toggle__btn--active");
      toggler.setAttribute("aria-pressed", "false");
      return;
    }

    sideCards.forEach((card) => {
      if (card.classList.contains("hidden")) {
        card.setAttribute("inert", "");
      } else {
        card.removeAttribute("inert");
      }
    });

    const allShown = Array.from(sideCards).every(
      (card) => !card.classList.contains("hidden"),
    );

    toggler.classList.toggle("toggle__btn--active", allShown);
    toggler.setAttribute("aria-pressed", allShown ? "true" : "false");
  };

  toggler.addEventListener("toggle:beforechange", (event) => {
    if (!desktopMedia.matches) {
      event.preventDefault();
    }
  });

  toggler.addEventListener("toggle:change", () => {
    sideCards.forEach((card) => card.classList.toggle("hidden"));
    syncState();
  });

  desktopMedia.addEventListener("change", syncState);
  syncState();
}

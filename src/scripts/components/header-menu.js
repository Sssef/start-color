export function initHeaderMenu() {
  const navbar = document.getElementById("navbar");
  if (!navbar || navbar.dataset.menuInitialized === "true") {
    return;
  }

  navbar.dataset.menuInitialized = "true";

  const openButton = document.getElementById("open-sidebar-button");
  const closeButton = document.getElementById("close-sidebar-button");
  const overlay = document.getElementById("overlay");
  const menuToggle = document.querySelector(".header__menu-toggle");
  const media = window.matchMedia("(max-width: 767px)");

  const syncNavbar = () => {
    if (media.matches) {
      if (navbar.classList.contains("show")) {
        navbar.removeAttribute("inert");
      } else {
        navbar.setAttribute("inert", "");
      }
    } else {
      navbar.classList.remove("show");
      menuToggle?.classList.remove("is-open");
      openButton?.setAttribute("aria-expanded", "false");
      navbar.removeAttribute("inert");
      document.body.style.overflow = "";
    }
  };

  const openSidebar = () => {
    if (!media.matches) {
      return;
    }

    navbar.classList.add("show");
    menuToggle?.classList.add("is-open");
    openButton?.setAttribute("aria-expanded", "true");
    navbar.removeAttribute("inert");
    document.body.style.overflow = "hidden";
  };

  const closeSidebar = () => {
    navbar.classList.remove("show");
    menuToggle?.classList.remove("is-open");
    openButton?.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";

    if (media.matches) {
      navbar.setAttribute("inert", "");
    } else {
      navbar.removeAttribute("inert");
    }
  };

  openButton?.addEventListener("click", openSidebar);
  closeButton?.addEventListener("click", closeSidebar);
  overlay?.addEventListener("click", closeSidebar);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navbar.classList.contains("show")) {
      closeSidebar();
    }
  });

  const navLinks = document.querySelectorAll(".navbar__link");
  navLinks.forEach((link) =>
    link.addEventListener("click", () => {
      if (media.matches) {
        closeSidebar();
      }
    }),
  );

  media.addEventListener("change", syncNavbar);
  syncNavbar();
}

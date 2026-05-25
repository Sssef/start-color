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
  const media = window.matchMedia("(max-width: 700px)");

  const syncNavbar = () => {
    if (media.matches) {
      navbar.setAttribute("inert", "");
    } else {
      navbar.removeAttribute("inert");
      document.body.style.overflow = "";
    }
  };

  const openSidebar = () => {
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
    navbar.setAttribute("inert", "");
    document.body.style.overflow = "";
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
  navLinks.forEach((link) => link.addEventListener("click", closeSidebar));

  media.addEventListener("change", syncNavbar);
  syncNavbar();
}

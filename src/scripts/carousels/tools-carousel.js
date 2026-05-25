import { mockData } from "../services/mock-api.js";
import { EmblaCarousel, setupEmblaButtons } from "./embla-setup.js";
import GLightbox from "glightbox";

export default function initToolsCarousel(specData = mockData) {
  const lightboxToolCard = `<div class="gslide">
    <div class="gslide-inner-content">
        <div class="ginner-container">
        <div class="card">
            <div class="gslide-media">
            </div>
            <div class="gslide-description">
                <div class="gdesc-inner ">
                    <h4 class="gslide-title"></h4>
                    <div class="gslide-desc">
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
  </div>`;

  function createToolSpecList(data) {
    return `
    <ul class="list brand">
      ${data
        .map((item) => {
          return `
          <li class="list__item">
            ${item}
          </li>
          `;
        })
        .join("")}
    </ul>
  `;
  }

  const tools = document.getElementById("tools-carousel");
  if (!tools) {
    return;
  }

  tools.innerHTML = "";

  function createToolsSlides(data) {
    data.forEach((item, slideIndex) => {
      const slide = document.createElement("li");
      slide.className = "embla__slide";
      slide.setAttribute("role", "listitem");
      slide.setAttribute("aria-roledescription", "slide");
      slide.setAttribute("aria-label", `${slideIndex + 1} из ${data.length}`);
      slide.innerHTML = `
    <div class="card tools-card">
      <div class="card__header">
      <span class="card__media">
        <a href="${item.img}"
           class="tools-lightbox-trigger"
           data-index="${slideIndex}">
          <img src="${item.img}"
          alt="${item.title}"
          decoding="async">
        </a>
        </span>
      </div>
      <div class="card__body">
        <h4 class="card__title">${item.title}</h4>
      </div>
    </div>
  `;
      tools.appendChild(slide);
    });
  }

  createToolsSlides(specData);

  const toolsWrapper = document.querySelector("#tools .embla.tools-list");
  if (!toolsWrapper) {
    return;
  }

  const viewportNode = toolsWrapper.querySelector(".embla__viewport");
  const prevButtonNode = toolsWrapper.querySelector(".tools-controls__prev");
  const nextButtonNode = toolsWrapper.querySelector(".tools-controls__next");
  const controlsNode = toolsWrapper.querySelector(".embla__controls");

  const emblaApi = EmblaCarousel(viewportNode, {
    loop: false,
    align: "start",
    startIndex: 0,
    slidesToScroll: 1,
  });

  setupEmblaButtons(emblaApi, prevButtonNode, nextButtonNode, controlsNode);

  const lightbox = GLightbox({
    selector: ".glightbox-disabled",
    slideHTML: lightboxToolCard,
    touchNavigation: true,
    loop: false,
    moreLength: 0,
    moreText: "",
  });

  lightbox.setElements(
    specData.map((item) => ({
      href: item.img,
      type: "image",
      title: item.title,
      description: createToolSpecList(item.spec),
    })),
  );

  toolsWrapper
    .querySelectorAll(".tools-lightbox-trigger")
    .forEach((trigger) => {
      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        const index = Number(trigger.dataset.index || 0);
        lightbox.openAt(index);
      });
    });
}

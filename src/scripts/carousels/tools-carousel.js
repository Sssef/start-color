import EmblaCarousel from "embla-carousel";
import GLightbox from "glightbox";
import { mockData } from "../services/mock-api.js";
import { setupEmblaButtons } from "./embla-setup.js";
import { getEmblaOptions, watchRTL } from "../utils/rtl.js";

/**
 * Генерирует список спецификаций для лайтбокса
 * @param {string[]} specs - массив строк спецификаций
 * @returns {string} HTML списка
 */
function createToolSpecList(specs) {
  return `
    <ul class="list brand">
      ${specs
        .map(
          (item) => `
          <li class="list__item">${item}</li>
        `,
        )
        .join("")}
    </ul>
  `;
}

/**
 * Инициализирует карусель оборудования с лайтбоксом
 * @param {Array} specData - данные для слайдов (по умолчанию mockData)
 */
export default function initToolsCarousel(specData = mockData) {
  const toolsContainer = document.getElementById("tools-carousel");
  if (!toolsContainer) return;

  const toolsWrapper = document.querySelector("#tools .embla.tools-list");
  if (!toolsWrapper) return;

  const viewportNode = toolsWrapper.querySelector(".embla__viewport");
  const prevButtonNode = toolsWrapper.querySelector(".tools-controls__prev");
  const nextButtonNode = toolsWrapper.querySelector(".tools-controls__next");
  const controlsNode = toolsWrapper.querySelector(".embla__controls");

  if (!viewportNode || !prevButtonNode || !nextButtonNode) return;

  // Очищаем контейнер перед генерацией
  toolsContainer.innerHTML = "";

  // Генерируем слайды
  specData.forEach((item, slideIndex) => {
    const slide = document.createElement("li");
    slide.className = "embla__slide";
    slide.setAttribute("role", "listitem");
    slide.setAttribute("aria-roledescription", "slide");
    slide.setAttribute("aria-label", `${slideIndex + 1} из ${specData.length}`);

    slide.innerHTML = `
      <div class="card tools-card">
        <div class="card__header">
          <span class="card__media">
            <a
              href="${item.img}"
              class="tools-lightbox-trigger"
              data-index="${slideIndex}"
              aria-label="Открыть подробное описание ${item.title}"
            >
              <img
                src="${item.img}"
                alt="${item.title}"
                decoding="async"
                loading="lazy"
              />
            </a>
          </span>
        </div>
        <div class="card__body">
          <h4 class="card__title">${item.title}</h4>
        </div>
      </div>
    `;

    toolsContainer.appendChild(slide);
  });

  // Инициализируем Embla
  const baseOptions = {
    loop: false,
    align: "start",
    startIndex: 0,
    slidesToScroll: 1,
  };

  const emblaApi = EmblaCarousel(viewportNode, getEmblaOptions(baseOptions));

  // Настраиваем кнопки навигации
  const teardownButtons = setupEmblaButtons(
    emblaApi,
    prevButtonNode,
    nextButtonNode,
    controlsNode,
  );

  // Подписываемся на изменение RTL
  const unsubscribeRTL = watchRTL(emblaApi);

  // Инициализируем GLightbox
  const lightbox = GLightbox({
    selector: ".glightbox-disabled", // отключаем авто-привязку
    touchNavigation: true,
    loop: false,
    moreLength: 0,
    moreText: "",
    // Кастомная разметка слайда
    slideHTML: `
      <div class="gslide">
        <div class="gslide-inner-content">
          <div class="ginner-container">
            <div class="card">
              <div class="gslide-media"></div>
              <div class="gslide-description">
                <div class="gdesc-inner">
                  <h4 class="gslide-title"></h4>
                  <div class="gslide-desc"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
  });

  // Настраиваем элементы лайтбокса
  lightbox.setElements(
    specData.map((item) => ({
      href: item.img,
      type: "image",
      title: item.title,
      description: createToolSpecList(item.spec || []),
    })),
  );

  // Привязываем обработчики кликов по триггерам
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

  // Cleanup при необходимости (опционально)
  return () => {
    unsubscribeRTL?.();
    teardownButtons?.();
    emblaApi?.destroy();
    lightbox?.destroy();
  };
}

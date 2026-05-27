import { EmblaCarousel, setupEmblaButtons } from "./embla-setup.js";
import { getEmblaOptions, watchRTL } from "@scripts/utils/rtl.js";

export default function initNewsCarousel() {
  const rootNode = document.querySelector(".section-news .embla.news-list");
  if (!rootNode) return;

  const viewportNode = rootNode.querySelector(".embla__viewport");
  const prevButtonNode = rootNode.querySelector(".news-controls__prev");
  const nextButtonNode = rootNode.querySelector(".news-controls__next");
  const controlsNode = rootNode.querySelector(".embla__controls");
  if (!viewportNode || !prevButtonNode || !nextButtonNode) return;

  const baseOptions = {
    axis: "x",
    align: "start",
    slidesToScroll: 1,
    loop: false,
    breakpoints: {
      "(min-width: 768px)": {
        axis: "y",
        containScroll: true,
      },
    },
  };

  const emblaApi = EmblaCarousel(viewportNode, getEmblaOptions(baseOptions));
  setupEmblaButtons(emblaApi, prevButtonNode, nextButtonNode, controlsNode);

  // 🔁 Реинициализация при смене dir
  watchRTL(emblaApi);
}

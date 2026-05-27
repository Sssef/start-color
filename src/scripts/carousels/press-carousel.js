import { EmblaCarousel, setupEmblaButtons } from "./embla-setup.js";
import { getEmblaOptions, watchRTL } from "@scripts/utils/rtl.js";

export default function initPressCarousel() {
  const rootNode = document.querySelector("#press .embla.press-list");
  if (!rootNode) return;

  const viewportNode = rootNode.querySelector(".embla__viewport");
  const prevButtonNode = rootNode.querySelector(".press-controls__prev");
  const nextButtonNode = rootNode.querySelector(".press-controls__next");
  const controlsNode = rootNode.querySelector(".embla__controls");
  if (!viewportNode || !prevButtonNode || !nextButtonNode) return;

  const emblaApi = EmblaCarousel(
    viewportNode,
    getEmblaOptions({
      axis: "x",
      align: "start",
      containScroll: "trimSnaps",
      slidesToScroll: 1,
      loop: false,
    }),
  );

  setupEmblaButtons(emblaApi, prevButtonNode, nextButtonNode, controlsNode);
  watchRTL(emblaApi);
}

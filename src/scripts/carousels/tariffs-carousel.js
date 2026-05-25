import { EmblaCarousel, setupEmblaButtons } from "./embla-setup.js";

export default function initTariffsCarousel() {
  const rootNode = document.querySelector(".section-tariffs .tariffs__embla");
  const viewportNode = rootNode?.querySelector(".tariffs__viewport");
  const prevButtonNode = document.querySelector(".tariffs-controls__prev");
  const nextButtonNode = document.querySelector(".tariffs-controls__next");

  if (!rootNode || !viewportNode || !prevButtonNode || !nextButtonNode) {
    return;
  }

  const controlsNode = prevButtonNode.closest(".embla__controls");
  const mobileMedia = window.matchMedia("(max-width: 747px)");

  let emblaApi = null;
  let teardownButtons = null;

  const syncCarousel = () => {
    if (mobileMedia.matches && !emblaApi) {
      emblaApi = EmblaCarousel(viewportNode, {
        startIndex: 1,
        align: "start",
        containScroll: "trimSnaps",
        loop: false,
        slidesToScroll: 1,
      });

      teardownButtons = setupEmblaButtons(
        emblaApi,
        prevButtonNode,
        nextButtonNode,
        controlsNode,
      );
      return;
    }

    if (!mobileMedia.matches && emblaApi) {
      teardownButtons?.();
      teardownButtons = null;
      emblaApi.destroy();
      emblaApi = null;
    }

    if (!mobileMedia.matches && controlsNode) {
      controlsNode.hidden = true;
    }
  };

  mobileMedia.addEventListener("change", syncCarousel);
  syncCarousel();
}

import { EmblaCarousel, setupEmblaButtons } from "./embla-setup.js";
import { getEmblaOptions, isRTL, watchRTL } from "@scripts/utils/rtl.js";

export default function initTariffsCarousel() {
  const rootNode = document.querySelector(".section-tariffs .tariffs__embla");
  const viewportNode = rootNode?.querySelector(".tariffs__viewport");
  const prevButtonNode = document.querySelector(".tariffs-controls__prev");
  const nextButtonNode = document.querySelector(".tariffs-controls__next");

  if (!rootNode || !viewportNode || !prevButtonNode || !nextButtonNode) return;

  const controlsNode = prevButtonNode.closest(".embla__controls");
  const mobileMedia = window.matchMedia("(max-width: 747px)");

  let emblaApi = null;
  let teardownButtons = null;
  let unsubscribeRTL = null;

  const syncCarousel = () => {
    if (mobileMedia.matches && !emblaApi) {
      emblaApi = EmblaCarousel(
        viewportNode,
        getEmblaOptions({
          startIndex: 1,
          align: "start",
          containScroll: "trimSnaps",
          loop: false,
          slidesToScroll: 1,
        }),
      );

      teardownButtons = setupEmblaButtons(
        emblaApi,
        prevButtonNode,
        nextButtonNode,
        controlsNode,
      );

      // Подписываемся на RTL-изменения
      unsubscribeRTL = watchRTL(emblaApi);
      return;
    }

    if (!mobileMedia.matches && emblaApi) {
      teardownButtons?.();
      teardownButtons = null;
      unsubscribeRTL?.(); // 🔥 Отписываемся
      unsubscribeRTL = null;
      emblaApi.destroy();
      emblaApi = null;
    }

    if (!mobileMedia.matches && controlsNode) {
      controlsNode.hidden = true;
    }
  };

  mobileMedia.addEventListener("change", syncCarousel);
  syncCarousel();

  // Cleanup при удалении компонента (опционально)
  return () => {
    unsubscribeRTL?.();
    teardownButtons?.();
    emblaApi?.destroy();
  };
}

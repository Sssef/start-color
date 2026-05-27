import EmblaCarousel from "embla-carousel";

/**
 * Настраивает кнопки навигации для Embla Carousel
 * @param {EmblaCarouselType} emblaApi - экземпляр Embla
 * @param {HTMLElement} prevButtonNode - кнопка "назад"
 * @param {HTMLElement} nextButtonNode - кнопка "вперёд"
 * @param {HTMLElement} [controlsNode] - контейнер кнопок (для скрытия)
 * @returns {Function} - функция очистки (teardown)
 */
function setupEmblaButtons(
  emblaApi,
  prevButtonNode,
  nextButtonNode,
  controlsNode,
) {
  if (!emblaApi || !prevButtonNode || !nextButtonNode) {
    return () => {};
  }

  const syncButtonsState = () => {
    const canScrollPrev = emblaApi.canScrollPrev();
    const canScrollNext = emblaApi.canScrollNext();
    const isScrollable = canScrollPrev || canScrollNext;

    prevButtonNode.disabled = !canScrollPrev;
    nextButtonNode.disabled = !canScrollNext;

    if (controlsNode) {
      controlsNode.style.display = isScrollable ? "" : "none";
    }
  };

  const onPrevClick = () => emblaApi.scrollPrev();
  const onNextClick = () => emblaApi.scrollNext();

  prevButtonNode.addEventListener("click", onPrevClick);
  nextButtonNode.addEventListener("click", onNextClick);

  emblaApi.on("init", syncButtonsState);
  emblaApi.on("reInit", syncButtonsState);
  emblaApi.on("select", syncButtonsState);
  syncButtonsState();

  return () => {
    prevButtonNode.removeEventListener("click", onPrevClick);
    nextButtonNode.removeEventListener("click", onNextClick);
    emblaApi.off("init", syncButtonsState);
    emblaApi.off("reInit", syncButtonsState);
    emblaApi.off("select", syncButtonsState);
  };
}

export { EmblaCarousel, setupEmblaButtons };

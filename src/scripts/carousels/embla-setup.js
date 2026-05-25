import EmblaCarousel from "embla-carousel";

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

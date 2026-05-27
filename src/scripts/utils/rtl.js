/**
 * Проверяет, установлено ли направление документа RTL
 */
export const isRTL = () => document.documentElement.dir === "rtl";

/**
 * Возвращает направление для Embla Carousel
 */
export const getEmblaDirection = () => (isRTL() ? "rtl" : "ltr");

/**
 * Возвращает опции Embla с учётом RTL
 * @param {Object} baseOptions - базовые опции
 * @returns {Object} - опции с direction
 */
export const getEmblaOptions = (baseOptions = {}) => ({
  ...baseOptions,
  direction: getEmblaDirection(),
});

/**
 * Подписывается на изменение dir и реинициализирует Embla
 * @param {EmblaCarouselType} emblaApi - экземпляр Embla
 * @param {Function} [onDirectionChange] - колбэк при смене направления
 * @returns {Function} - функция отписки
 */
export const watchRTL = (emblaApi, onDirectionChange) => {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (
        mutation.attributeName === "dir" &&
        mutation.target === document.documentElement
      ) {
        // Реинициализируем с новыми опциями
        const currentOptions = emblaApi.internalEngine().options;
        emblaApi.reInit({
          ...currentOptions,
          direction: getEmblaDirection(),
        });
        onDirectionChange?.(isRTL());
        break;
      }
    }
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["dir"],
  });

  return () => observer.disconnect();
};

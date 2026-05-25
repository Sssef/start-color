import { fetchCounterData } from "../services/mock-api.js";
import { formatNumberRu } from "../utils/format.js";

export default function initLiveAICounter() {
  const counterNode = document.querySelector(".ai-counter");
  if (!counterNode) {
    return;
  }

  const POLL_INTERVAL_MS = 3000;
  let currentCounter = 20237;
  let intervalId = null;

  const animateCounter = (from, to) => {
    if (window.countUp?.CountUp) {
      const countUpInstance = new window.countUp.CountUp(counterNode, to, {
        startVal: from,
        duration: 1.1,
        separator: " ",
        useEasing: true,
      });

      if (!countUpInstance.error) {
        countUpInstance.start();
        return;
      }
    }

    const startTime = performance.now();
    const duration = 1100;
    const delta = to - from;

    const step = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const value = from + delta * (1 - (1 - progress) ** 3);
      counterNode.textContent = formatNumberRu(value);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const syncCounter = async () => {
    const payload = await fetchCounterData();
    const nextCounter = Number(payload?.value);

    if (!Number.isFinite(nextCounter) || nextCounter <= currentCounter) {
      return;
    }

    const prevCounter = currentCounter;
    currentCounter = nextCounter;
    animateCounter(prevCounter, currentCounter);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !intervalId) {
          syncCounter();
          intervalId = window.setInterval(syncCounter, POLL_INTERVAL_MS);
        } else if (!entry.isIntersecting && intervalId) {
          window.clearInterval(intervalId);
          intervalId = null;
        }
      });
    },
    { threshold: 0.1 },
  );

  observer.observe(counterNode);
}

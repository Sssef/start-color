import { fetchCounterData } from "../services/mock-api.js";
import { formatNumberRu } from "../utils/format.js";

export default function initLiveAICounter() {
  const counterNode = document.querySelector(".ai-counter");
  if (!counterNode) return;

  const POLL_INTERVAL_MS = 3000;
  let currentCounter = 20237;
  let intervalId = null;
  let isRunning = false; // Защита от двойного запуска

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
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const syncCounter = async () => {
    try {
      const payload = await fetchCounterData();
      const nextCounter = Number(payload?.value);

      // Если бэкенд отдал новое значение → используем его
      if (Number.isFinite(nextCounter) && nextCounter > currentCounter) {
        const prev = currentCounter;
        currentCounter = nextCounter;
        animateCounter(prev, currentCounter);
        return;
      }

      // Fallback для демо-режима: эмулируем приход 1–3 заказов локально
      const fakeIncrement = Math.floor(Math.random() * 3) + 1;
      const prev = currentCounter;
      currentCounter += fakeIncrement;
      animateCounter(prev, currentCounter);
    } catch {
      // При ошибке сети тоже эмулируем рост (чтобы демо не "зависало")
      const fakeIncrement = Math.floor(Math.random() * 3) + 1;
      const prev = currentCounter;
      currentCounter += fakeIncrement;
      animateCounter(prev, currentCounter);
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isRunning) {
          isRunning = true;
          syncCounter(); // Первый вызов сразу
          intervalId = window.setInterval(syncCounter, POLL_INTERVAL_MS);
        } else if (!entry.isIntersecting && isRunning) {
          isRunning = false;
          if (intervalId) {
            window.clearInterval(intervalId);
            intervalId = null;
          }
        }
      });
    },
    { threshold: 0.1 },
  );

  observer.observe(counterNode);
}

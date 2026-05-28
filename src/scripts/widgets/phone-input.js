import {
  formatPhoneDisplay,
  parsePhoneRaw,
} from "@scripts/utils/phone-format.js";

export function initPhoneInput(inputSelector, countrySelector) {
  const input = document.querySelector(inputSelector);
  const countrySelect = document.querySelector(countrySelector);

  if (!input || !countrySelect) {
    return { validate: () => true, getFullPhone: () => "" };
  }

  const placeholders = {
    7: "(999) 123-45-67",
    1: "(999) 123-4567",
    44: "20 1234 5678",
    49: "30 12345678",
    33: "1 23 45 67 89",
    998: "90 123 45 67",
    27: "10 123 4567",
    20: "10 1234 5678",
    212: "5 12 34 56 78",
    default: "123 456 7890",
  };

  // ===== Инициализация =====
  const updatePlaceholder = () => {
    const code = countrySelect.value;
    input.placeholder = placeholders[code] || placeholders.default;
    input.dataset.countryCode = code;
  };

  countrySelect.addEventListener("change", () => {
    updatePlaceholder();
    // При смене страны — переформатируем, если поле не в фокусе
    if (document.activeElement !== input) {
      const raw = input.dataset.rawDigits || "";
      input.value = formatPhoneDisplay(raw, countrySelect.value);
    }
  });
  updatePlaceholder();

  // ===== При вводе: только очистка, БЕЗ форматирования =====
  input.addEventListener("input", (e) => {
    // Оставляем только цифры (и + в начале, если пользователь ввёл)
    const cleaned = e.target.value.replace(/[^\d+]/g, "");

    // Сохраняем "сырые" цифры (без +) для отправки
    const digits = cleaned.replace(/^\+/, "");
    input.dataset.rawDigits = digits;

    // Обновляем значение: только очистка, без форматирования
    // Пользователь видит: 9231282537 (удобно редактировать)
    if (e.target.value !== cleaned) {
      e.target.value = cleaned;
    }
  });

  // ===== При потере фокуса: применяем красивое форматирование =====
  input.addEventListener("blur", () => {
    const raw = input.dataset.rawDigits || "";
    const code = input.dataset.countryCode || "7";
    const formatted = formatPhoneDisplay(raw, code);

    // Обновляем только если есть что форматировать
    if (raw && formatted && input.value !== formatted) {
      input.value = formatted;
    }
  });

  // ===== При фокусе: показываем "сырые" цифры для редактирования =====
  input.addEventListener("focus", (e) => {
    const raw = input.dataset.rawDigits || "";
    // Показываем только цифры, чтобы пользователь мог легко править
    if (raw && input.value !== raw) {
      e.target.value = raw;
    }
  });

  // ===== Получение полного номера для отправки =====
  const getFullPhone = () => {
    const code = countrySelect.value;
    const raw = input.dataset.rawDigits || input.value.replace(/\D/g, "");
    return parsePhoneRaw(raw, code);
  };

  // ===== Валидация =====
  const validate = () => {
    const full = getFullPhone();
    const digitsOnly = full.replace(/\D/g, "");
    return digitsOnly.length >= 7 && digitsOnly.length <= 15;
  };

  return { validate, getFullPhone };
}

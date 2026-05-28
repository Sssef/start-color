/**
 * Форматирует номер телефона визуально (не меняет значение для отправки)
 * Поддерживает основные регионы: РФ/СНГ, США/Канада, Европа, Африка
 * @param {string} value - сырой ввод пользователя (может быть с кодом или без)
 * @param {string} countryCode - код страны (7, 1, 44, и т.д.)
 * @returns {string} - отформатированная строка для отображения
 */
export function formatPhoneDisplay(value, countryCode = "7") {
  // Удаляем всё кроме цифр и плюса
  const clean = value.replace(/[^\d+]/g, "");

  // Если начинается с +, убираем его для обработки
  const digits = clean.replace(/^\+/, "");

  // Простые шаблоны по регионам
  const formats = {
    // РФ/СНГ: +7 (999) 123-45-67
    // Ожидаем: 9231282537 (10 цифр) или 79231282537 (11 цифр)
    7: (d) => {
      // Если номер включает код страны (11 цифр и начинается с 7), убираем его для форматирования
      const num = d.length === 11 && d.startsWith("7") ? d.slice(1) : d;

      if (!num) return "";
      if (num.length <= 3) return `(${num}`;
      if (num.length <= 6) return `(${num.slice(0, 3)}) ${num.slice(3)}`;
      if (num.length <= 8)
        return `(${num.slice(0, 3)}) ${num.slice(3, 6)}-${num.slice(6)}`;
      return `(${num.slice(0, 3)}) ${num.slice(3, 6)}-${num.slice(6, 8)}-${num.slice(8, 10)}`;
    },

    // США/Канада: +1 (999) 123-4567
    1: (d) => {
      const num = d.length === 11 && d.startsWith("1") ? d.slice(1) : d;
      if (!num) return "";
      if (num.length <= 3) return `(${num}`;
      if (num.length <= 6) return `(${num.slice(0, 3)}) ${num.slice(3)}`;
      return `(${num.slice(0, 3)}) ${num.slice(3, 6)}-${num.slice(6, 10)}`;
    },

    // Европа (общий): +44 20 1234 5678
    default: (d) => {
      // Группируем по 2-4 цифры, просто для читаемости
      return d.match(/.{1,4}/g)?.join(" ") || d;
    },
  };

  const formatter = formats[countryCode] || formats["default"];
  const formatted = formatter(digits);

  // Возвращаем с плюсом, если был
  return clean.startsWith("+") ? `+${formatted}` : formatted;
}

/**
 * Возвращает "сырой" номер для отправки: +79991234567
 * @param {string} displayValue - отформатированное значение
 * @param {string} countryCode - код страны
 * @returns {string} - E.164-like формат
 */
export function parsePhoneRaw(displayValue, countryCode = "7") {
  const digits = displayValue.replace(/[^\d]/g, "");
  const prefix =
    countryCode === "7" && digits.startsWith("8") ? "7" : countryCode;

  // Если номер начинается с 8 и код 7 — заменяем на 7
  const cleanDigits =
    digits.startsWith("8") && countryCode === "7" ? digits.slice(1) : digits;

  return `+${prefix}${cleanDigits}`;
}

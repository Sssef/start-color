import { initPhoneInput } from "@scripts/widgets/phone-input.js";

// Инициализация валидатора телефона (выносится ЗА пределы функции)
const phoneValidator = initPhoneInput("#req-phone", "#req-phone-country");

/**
 * Инициализирует модальное окно с формой
 * @param {string} modalId - ID элемента <dialog>
 * @param {Object} options - Опции формы
 */
export function initModalForm(modalId, options = {}) {
  const dialog = document.getElementById(modalId);
  if (!dialog) return;

  const { onSubmit, validation = {} } = options;
  const form = dialog.querySelector("form");
  const triggers = document.querySelectorAll(
    `[data-modal-trigger="${modalId}"]`,
  );
  const closeBtns = dialog.querySelectorAll("[data-modal-close]");
  let lastTrigger = null;

  // ===== Открытие =====
  const open = () => {
    dialog.showModal();
    setTimeout(
      () => form?.querySelector("input, select, textarea")?.focus(),
      150,
    );
  };

  // ===== Закрытие =====
  const close = () => dialog.close();

  // ===== Очистка ошибок =====
  const clearErrors = () => {
    dialog.querySelectorAll(".form-field__error").forEach((el) => {
      el.textContent = "";
    });
    dialog
      .querySelectorAll(".form-field__input, .form-field__select")
      .forEach((el) => {
        el.classList.remove("form-field__input--error");
        el.removeAttribute("aria-invalid");
      });
  };

  // ===== Показать ошибку =====
  const showError = (input, message) => {
    const field = input.closest(".form-field");
    const errorEl = field?.querySelector(".form-field__error");
    if (errorEl) errorEl.textContent = message;
    input.classList.add("form-field__input--error");
    input.setAttribute("aria-invalid", "true");
  };

  // ===== Валидация =====
  const validate = (formData) => {
    let valid = true;

    // Имя (обязательно)
    if (validation.name !== false) {
      const name = formData.get("name")?.trim();
      if (!name) {
        showError(form.name, "Введите ваше имя");
        valid = false;
      }
    }

    // Телефон (опциональный, но если заполнен → должен быть валидным)
    const phone = formData.get("phone")?.trim();
    if (phone && phoneValidator?.validate && !phoneValidator.validate()) {
      showError(
        document.getElementById("req-phone"),
        "Неверный формат телефона",
      );
      valid = false;
    }

    // Email (обязательно + формат)
    if (validation.email !== false) {
      const email = formData.get("email")?.trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError(form.email, "Введите корректный email");
        valid = false;
      }
    }

    // Согласие (обязательно)
    if (validation.consent !== false && form.consent) {
      const consent = formData.get("consent");
      if (!consent) {
        const checkboxLabel = form.consent?.closest("label");
        if (checkboxLabel)
          checkboxLabel.style.color = "var(--clr-error, #ef4444)";
        valid = false;
      }
    }

    return valid;
  };

  // ===== Обработка отправки =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    clearErrors();

    // Сброс цвета чекбокса
    const checkboxLabel = form.consent?.closest("label");
    if (checkboxLabel) checkboxLabel.style.color = "";

    const formData = new FormData(form);

    // подставляем полный номер с кодом страны
    if (phoneValidator?.getFullPhone) {
      formData.set("phone", phoneValidator.getFullPhone());
    }

    // валидация вызывается ОДИН раз, телефон проверяется внутри
    const isValid = validate(formData);
    if (!isValid) return;

    const submitBtn = form.querySelector('[type="submit"]');
    const originalText = submitBtn.textContent;

    // Состояние загрузки
    submitBtn.disabled = true;
    submitBtn.textContent = "Отправка...";

    try {
      // Если передан кастомный onSubmit — используем его
      if (typeof onSubmit === "function") {
        await onSubmit(formData);
      } else {
        // Иначе имитируем запрос
        await new Promise((res) => setTimeout(res, 1200));
      }

      // Успех
      submitBtn.textContent = "✓ Отправлено";
      submitBtn.style.background = "var(--clr-success, #10b981)";

      setTimeout(() => {
        close();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = "";
        form.reset();
      }, 1500);
    } catch (err) {
      console.error("Form submission error:", err);
      submitBtn.textContent = "Ошибка";
      submitBtn.disabled = false;
    }
  };

  // ===== Обработчики событий =====
  triggers.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      lastTrigger = e.currentTarget;
      open();
    });
  });

  closeBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      close();
    });
  });

  // Закрытие по клику на оверлей
  dialog.addEventListener("click", (e) => {
    const content = dialog.querySelector(".modal__content");
    if (content && !content.contains(e.target)) {
      close();
    }
  });

  // Закрытие по ESC + возврат фокуса
  dialog.addEventListener("close", () => {
    clearErrors();
    form.reset();
    if (lastTrigger) {
      lastTrigger.focus();
      lastTrigger = null;
    }
  });

  // Отправка формы
  form?.addEventListener("submit", handleSubmit);

  // Cleanup
  return () => {
    triggers.forEach((btn) => btn.removeEventListener("click", open));
    closeBtns.forEach((btn) => btn.removeEventListener("click", close));
    form?.removeEventListener("submit", handleSubmit);
  };
}

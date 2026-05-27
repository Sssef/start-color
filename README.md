# 🎨 StartColor — AI-платформа для профессиональной колеровки

<div align="center">

![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-Living_Standard-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-Nesting_+_Tokens-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/ES2022-Modules-F7DF1E?logo=javascript&logoColor=black)
![PNPM](https://img.shields.io/badge/pnpm-9.x-F69220?logo=pnpm&logoColor=white)
![License](https://img.shields.io/badge/License-Proprietary-red)

**ИИ-система для управления колеровкой цвета автомобилей**

[О проекте](#-о-проекте) • [Быстрый старт](#-быстрый-старт) • [Структура](#-структура-проекта) • [Дизайн-система](#-дизайн-система-и-токены) • [Методология](#-бэм-методология) • [Деплой](#-сборка-и-деплой)

</div>

---

### Ключевые особенности

| Фича            | Реализация                                             |
| --------------- | ------------------------------------------------------ |
| Дизайн-система  | CSS Custom Properties + 150+ токенов                   |
| Темы            | Light / Dark через `data-theme` атрибут                |
| Адаптивность    | Mobile-first, брейкпоинты 768px / 992px / 1200px       |
| Карусели        | Embla Carousel (оборудование, тарифы, новости, пресса) |
| Графики         | Chart.js 4 (линейные, бар-чарты)                       |
| Лайтбокс        | GLightbox (детальные фото оборудования)                |
| Мультиязычность | RU / EN / AR (с поддержкой RTL)                        |
| Анимации        | CSS Keyframes + `prefers-reduced-motion`               |

---

## 🚀 Быстрый старт

### Требования

- **Node.js** ≥ 22.0.0
- **pnpm** ≥ 9.0.0 (рекомендуется) или npm

### Установка

```bash
# Клонировать репозиторий
git clone https://github.com/your-org/start-color.git
cd start-color

# Установить зависимости
pnpm install

# Запустить dev-сервер
pnpm dev
```

Откройте http://localhost:5173 — HMR работает мгновенно.

# Доступные скрипты:

pnpm dev # Dev-сервер с HMR (порт 5173)
pnpm build # Production-сборка в ./dist
pnpm preview # Локальный preview production-сборки (порт 4173)
pnpm lint # ESLint + Stylelint (если настроены)
pnpm format # Prettier форматирование

## 📁 Структура проекта

<pre>
start-color/
│
├── public/ # 🌐 Статические файлы (копируются as-is)
│ ├── favicon.ico # Иконка для старых браузеров
│ ├── favicon.svg # Векторная иконка (приоритет)
│ ├── apple-touch-icon.png # Иконка для iOS
│ ├── web-app-manifest-\*.png # Иконки для PWA
│ ├── site.webmanifest # Web App Manifest
│ ├── icons.svg # SVG-спрайт
│ ├── robots.txt # Инструкции для поисковиков
│ └── sitemap.xml # (генерируется при сборке)
│
├── src/
│ │
│ ├── styles/ # 🎨 Стили проекта
│ │ ├── base/ # Базовые стили (reset, tokens, typography)
│ │ ├── components/ # БЭМ-компоненты (btn, card, accordion, chip)
│ │ ├── blocks/ # Крупные блоки (header, footer, hero, section)
│ │ ├── sections/ # Стили конкретных секций (tariffs, news, press)
│ │ ├── cards/ # Миксы карточек (news-card, press-card)
│ │ ├── pages/ # Специфичные стили страниц
│ │ ├── utilities/ # Утилитарные классы
│ │ └── main.css # 📌 ENTRY POINT: импортирует всё
│ │
│ ├── scripts/ # ⚡ JavaScript модули
│ │ ├── components/ # Переиспользуемые компоненты
│ │ ├── carousels/ # Настройка Embla
│ │ ├── widgets/ # Виджеты (AI-счётчик, графики, cookies)
│ │ ├── services/ # API и хранилище
│ │ ├── utils/ # Утилиты (dom, format, debounce)
│ │ ├── pages/ # Скрипты для конкретных страниц
│ │ └── main.js # 📌 ENTRY POINT: импортирует всё
│ │
│ └── assets/ # 🖼 Ассеты (обрабатываются Vite)
│ ├── icons/ # SVG-иконки
│ ├── images/ # Изображения (оптимизируются автоматически)
│ │ ├── hero/
│ │ ├── stickers/
│ │ ├── tools/
│ │ └── press/
│ └── fonts/ # Локальные шрифты (если есть)
│
├── index.html # 🏠 Главная (лендинг)
├── about.html # 👥 О компании
├── agreement.html # 📄 Пользовательское соглашение
├── privacy.html # 🔒 Политика конфиденциальности
├── 404.html # ❌ Страница 404
├── 500.html # ⚠️ Страница 500
│
├── vite.config.js # ⚙️ Конфигурация Vite
├── postcss.config.cjs # 🎯 PostCSS плагины
├── package.json # 📦 Зависимости
├── pnpm-lock.yaml # 🔒 Lock-файл
├── .prettierrc # 💅 Prettier конфиг
├── .editorconfig # 📝 EditorConfig
└── .gitignore # 🚫 Игнорируемые файлы
</pre>

## Принцип организации

- public/ — файлы, которые не обрабатываются Vite (копируются 1:1)
- src/assets/ — обрабатываемые ассеты (оптимизация, хэши в именах)
- HTML в корне — Vite использует их как entry points для MPA
- Entry points — src/styles/main.css и src/scripts/main.js импортируют всё остальное

# 🎨 Дизайн-система и токены

Система построена по принципу Two-Layer Token Architecture (примитивы + семантика), что обеспечивает:

- 🔄 Лёгкое переключение тем
- 🎯 Семантическую осмысленность в коде
- 📈 Масштабируемость (новые компоненты = 0 новых цветов)

## Архитектура токенов

<pre>
PRIMITIVE TOKENS              SEMANTIC TOKENS             USAGE
─────────────────            ─────────────────            ─────
--blue-500: #117ecd    →     --brand: var(--blue-500)  →  .btn--default
--grey-300: #e4e5e9    →     --border-clr: var(--...)  →  .card
--font-sz-lg: 1.25rem  →     --font-sz-title: clamp()  →  h1, h2
--gap-md: 1.25rem      →     --section-gap: 5rem       →  .section
</pre>

## Категории токенов

🎨 1. Цвета (--_clr_, --brand*, --grey*, --blue\*)
Примитивная палитра:

```css
:root {
/_ Brand _/
--brand: #0075c9; /_ Основной синий _/
--brand-strong: #003b71; /_ Тёмный акцент _/
--brand-soft: #54c8e8; /_ Светлый акцент _/
--brand-accent: #2581de; /_ Hover/Active _/
--brand-plain: #374356; /_ Текст на белом _/

/_ Gradient _/
--brand-gradient: linear-gradient(135deg, var(--brand) 0%, var(--brand-soft) 100%);

/_ Greys _/
--grey-100: #6b7280; /_ Тёмно-серый _/
--grey-200: #7c89a1; /_ Приглушённый _/
--grey-300: #e4e5e9; /_ Светло-серый _/
--grey-400: #ecedf0; /_ Очень светлый _/
--grey-500: #f3f4f7; /_ Почти белый _/
--grey-600: #f9f9fb; /_ Фон _/

/_ Blues (фоновые) _/
--blue-500: #f2f8fc;
--blue-600: #e5edf7;
}
```

Семантические алиасы (использовать в компонентах):

```css
:root {
  /* Текст */
  --font-clr-heading: var(--brand-strong); /* Заголовки h1-h6 */
  --font-clr-body: var(--brand-plain); /* Основной текст */
  --font-clr-muted: #7c89a1; /* Второстепенный */
  --font-clr-placeholder: #7c89a1; /* Плейсхолдеры */
  --font-clr-on-brand: var(--white); /* Текст на брендовом фоне */

  /* Поверхности */
  --bg-page: var(--white); /* Фон страницы */
  --bg-header: var(--white); /* Фон хедера */
  --bg-elevated: var(--white); /* Карточки, модалки */
  --bg-muted: var(--blue-600); /* Приглушённый фон */

  /* Границы */
  --border-clr: var(--grey-100); /* Цвет границ */
}
```

## 🌙 2. Тёмная тема

Переключается через data-theme="dark" на <html>:

```css
:root[data-theme="dark"] {
  color-scheme: dark;

  --brand-plain: #e5edf7;
  --font-clr-heading: #d6e4ff;
  --font-clr-body: #d5deeb;
  --font-clr-muted: #98a8c6;

  --bg-page: #0b1220;
  --bg-header: #101a2d;
  --bg-elevated: #121d31;
  --card-bg: #121d31;

  --border-clr: #3b4e6b;
  --grey-300: #2f3d55;

  --box-shd: 0 0.25rem 0.75rem 0 rgb(0 0 0 / 32%);
}
```

Переключение темы из JS:

```javascript
// src/scripts/components/theme-switcher.js
const toggle = document.getElementById("themeToggler");
toggle.addEventListener("click", () => {
  const isDark = document.documentElement.dataset.theme === "dark";
  document.documentElement.dataset.theme = isDark ? "light" : "dark";
  localStorage.setItem("start-color-theme", isDark ? "light" : "dark");
});
```

## 📏 3. Типографика (--font-\*)

Fluid typography через clamp() для плавного масштабирования:

```css
:root {
/_ Семейства _/
--font-fm-heading: "Comfortaa", system-ui, sans-serif;
--font-fm-body: "Open Sans", system-ui, sans-serif;

/_ Веса _/
--font-wgt-reg: 400;
--font-wgt-semi: 600;
--font-wgt-bold: 700;

/_ Размеры (fluid) _/
--font-sz-title: clamp(2rem, calc(3.5vw - 1rem), 3.125rem);
--font-sz-subtitle: clamp(1.125rem, calc(1.5vw - 1rem), 1.25rem);
--font-sz-section-title: clamp(2rem, calc(3.5vw - 1rem), 3rem);
--font-sz-body: clamp(1rem, calc(1.5vw - 1rem), 1.125rem);
--font-sz-sm: 1rem;
--font-sz-xs: 0.875rem;
--font-sz-xxs: 0.75rem;

/_ Межстрочный интервал _/
--line-h-default: 120%;
--line-h-lg: 140%;
}
```

Применение:

```css
.hero__title {
  font-family: var(--font-fm-heading);
  font-size: var(--font-sz-title);
  font-weight: var(--font-wgt-bold);
  line-height: var(--line-h-default);
  color: var(--font-clr-heading);
}
```

## 📐 4. Отступы (--gap-\*)

```css
:root {
  --gap-xl: 2.5rem; /* 40px */
  --gap-lg: 2rem; /* 32px */
  --gap-default: 1.5rem; /* 24px — основной */
  --gap-md: 1.25rem; /* 20px */
  --gap-sm: 1rem; /* 16px */
  --gap-xs: 0.75rem; /* 12px */
  --gap-xxs: 0.5rem; /* 8px */

  /* Специальные */
  --section-gap: 5rem; /* Между секциями */
  --container-gap: clamp(1.875rem, 5vw, 5rem);
  --card-spacing: var(--gap-default);
  --list-gap: 0.625rem;
}
```

## 🃏 5. Компонентные токены

Каждый крупный компонент имеет свои токены:

```css
:root {
  /* Card */
  --card-pad: clamp(0.9375rem, calc(2vw - 1rem), 2.5rem);
  --card-pad-fixed: 0.9375rem;
  --card-border-rad: 1.25rem;
  --card-bg: var(--white);
  --card-box-shd:
    0 0 0 0.03125rem var(--grey-300), 0 0 0 0.0625rem var(--grey-400),
    0 0 0 0.21875rem var(--grey-600);

  /* Button */
  --button-font-sz: 0.75rem;
  --button-border-rad: 0.75rem;
  --button-h: 2.875rem;
  --button-pad: 0 1rem;
  --button-clr: var(--brand);
  --button-clr-hover: var(--brand-gradient);
  --button-clr-active: var(--brand-accent);
  --button-clr-disabled: var(--grey-100);

  /* Accordion */
  --accordion-h: 2.875rem;
  --accordion-font-sz: var(--font-sz-body);
}
```

# 🎯 Как добавлять новые токены

## Правило 1: Никогда не использовать хардкод-значения в компонентах.

```css
/* ❌ Плохо */
.new-component {
  color: #0075c9;
  padding: 24px;
}

/* ✅ Хорошо */
.new-component {
  color: var(--brand);
  padding: var(--gap-default);
}
```

## Правило 2: Если нужно значение, которого нет в токенах:

1. Проверьте, нет ли подходящего семантического токена
2. Если нет — добавьте новый токен в design-tokens.css:

```css
:root {
  /* ... existing tokens ... */
  --my-new-token: 1.5rem;
}
```

3. Если токен зависит от темы — добавьте его в :root[data-theme="dark"]

## Правило 3: Для компонент-специфичных значений используйте префикс компонента:

```css
:root {
  --my-widget-pad: var(--gap-md);
  --my-widget-radius: 0.5rem;
}
```

## 🎭 Использование градиентов

Брендовый градиент — часто используемый элемент:

```css
/* Градиентный текст */
.hero__title > span {
  background-image: var(--brand-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Градиентная обводка (кнопка .btn--outline) */
.btn--outline {
  border: var(--border-w) solid transparent;
  background:
    linear-gradient(var(--bg-elevated), var(--bg-elevated)) padding-box,
    var(--brand-gradient) border-box;
}

/* Градиентный фон */
.chip--gradient {
  background: var(--brand-gradient);
}
```

# 🧩 БЭМ-методология

Проект следует БЭМ (Блок-Элемент-Модификатор) со следующими соглашениями:

## Синтаксис

<pre>
блок
блок__элемент
блок--модификатор
блок__элемент--модификатор
</pre>

## Иерархия в проекте

styles/
├── components/ # Атомарные компоненты (btn, card, accordion)
├── blocks/ # Крупные блоки (header, footer, hero)
├── sections/ # Секции страницы (tariffs, analytics)
└── cards/ # Миксы карточек (news-card = card + news-card)

## Правила

✅ Правильно

```html
<!-- Базовый блок + микс для конкретной карточки -->
<article class="card news-card">
  <div class="card__header">
    <h3 class="card__title">Новость</h3>
  </div>
  <div class="card__body">
    <p class="card__text">Текст</p>
  </div>
</article>
```

```css
/* card.css — базовый блок */
.card {
  /* ... */
}
.card__title {
  /* ... */
}

/* news-card.css — микс, расширяет карточку */
.news-card {
  gap: 16px;
}
.news-card .card__title {
  -webkit-line-clamp: 1;
}
```

❌ Неправильно

```html
<!-- Модификатор меняет структуру до неузнаваемости -->
<article class="card card--download">
  <!-- ❌ -->
  <!-- Уникальная структура, не похожая на обычную card -->
</article>
```

Решение: создать отдельный блок **download-card**

Ситуация -> Решение
Меняется цвет/размер (вариация)
Модификатор: btn--default, btn--outline

Меняется структура/семантика
Микс: card news-card, card press-card

Поведенческая вариация
Модификатор: accordion--mobile, accordion--open

# 🏗 Архитектурные решения

Multi-Page Application (MPA)

## Почему не SPA:

SEO: каждая страница индексируется отдельно
Производительность: нет одного большого бандла
Простота: нет роутинга, состояния, SSR

## Как работает в Vite:

```javascript
// vite.config.js
rollupOptions: {
  input: {
    main: resolve(__dirname, "index.html"),
    about: resolve(__dirname, "about.html"),
    // ...
  },
}
```

Каждая HTML-страница — отдельный entry point. Vite собирает независимые бандлы для каждой.

## Code Splitting

Vite автоматически разделяет код:

vendor-charts-[hash].js — Chart.js
vendor-carousel-[hash].js — Embla
main-[hash].js — ваш код
Браузер кеширует vendor-чанки надолго (1 год), т.к. их хэш меняется только при обновлении библиотек.

# 🔨 Сборка и деплой

Локальная сборка

```bash
pnpm build
```

Результат в ./dist/:

<pre>
dist/
├── css/
│ └── main-a1b2c3d4.css # 40-60 KB gzip
├── js/
│ ├── main-e5f6g7h8.js # Ваш код
│ ├── vendor-charts-[hash].js # Chart.js
│ ├── vendor-carousel-[hash].js # Embla
│ └── vendor-lightbox-[hash].js # GLightbox
├── img/
│ ├── hero-[hash].webp # Оптимизированные
│ └── ...
├── fonts/
├── index.html
├── about.html
├── ...
├── sitemap.xml # Сгенерирован
└── robots.txt
</pre>

## Оптимизации при сборке

vite-plugin-image-optimizer → WebP/AVIF
60-80%

HTML
vite-plugin-minify (удаление пробелов)
30-40%

JS/CSS
Terser + esbuild
20-30%

Gzip
vite-plugin-compression2
60-70%

Brotli
vite-plugin-compression2
70-80%

## Проблема: Тёмная тема не применяется

Проверьте:
Атрибут data-theme="dark" на <html>
Соответствующие токены в :root[data-theme="dark"]
Нет ли хардкод-цветов в компонентах

## Проблема: Карусель не работает на мобильных

Проверьте:
Embla импортирован в main.js
HTML-структура: <ul> + <li> с правильными классами
В DevTools → Console нет ошибок

## RTL языки и числа

Для корректного отображения чисел (если это чисто числовое значение без текста) в RTL языках нужно их оборачивать в класс **_.rtl-number_**.

Пример: числовые значения цен в тарифах

import { defineConfig } from "vite";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { ViteMinifyPlugin } from "vite-plugin-minify";
import { compression } from "vite-plugin-compression2";
import Sitemap from "vite-plugin-sitemap";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === "development";
  const isProd = mode === "production";
  const baseFromEnv = process.env.VITE_BASE_PATH;

  return {
    // Базовый путь (для деплоя в подпапку, если нужно: base: "/start-color/")
    base: baseFromEnv || "/",

    // Алиасы для удобных импортов
    // resolve: {
    //   alias: {
    //     "@": resolve(rootDir, "./src"),
    //     "@styles": resolve(rootDir, "./src/styles"),
    //     "@scripts": resolve(rootDir, "./src/scripts"),
    //     "@assets": resolve(rootDir, "./src/assets"),
    //     "@images": resolve(rootDir, "./src/assets/images"),
    //     "@icons": resolve(rootDir, "./src/assets/icons"),
    //   },
    // },

    // Сервер разработки
    server: {
      port: 5173,
      open: true,
      cors: true,
    },

    // Preview-сервер для проверки production-сборки
    preview: {
      port: 4173,
      open: true,
    },

    // CSS конфигурация
    css: {
      devSourcemap: true,
      // PostCSS обрабатывается через postcss.config.cjs
    },

    // Production build
    build: {
      // Целевая версия браузеров (ES2022 = современные браузеры)
      target: "es2022",

      // Папка вывода
      outDir: "dist",
      emptyOutDir: true,

      // Sourcemaps только в dev
      sourcemap: isDev,

      // Минификация через terser (лучше сжимает, чем esbuild)
      minify: isProd ? "terser" : false,

      terserOptions: {
        compress: {
          drop_console: isProd, // Убираем console.log в prod
          drop_debugger: isProd,
        },
      },

      // Размер чанка для предупреждений (1MB)
      chunkSizeWarningLimit: 1000,

      // Rollup options для Multi-Page Application
      rollupOptions: {
        // Все HTML страницы
        input: {
          main: resolve(rootDir, "index.html"),
          about: resolve(rootDir, "about.html"),
          agreement: resolve(rootDir, "agreement.html"),
          privacy: resolve(rootDir, "privacy.html"),
          404: resolve(rootDir, "404.html"),
          500: resolve(rootDir, "500.html"),
        },

        output: {
          // Структура output папок с хэшами для кеширования
          assetFileNames: (assetInfo) => {
            const name = assetInfo.name || "";

            // CSS → css/[name]-[hash].css
            if (name.endsWith(".css")) {
              return "css/[name]-[hash][extname]";
            }

            // Изображения → img/[name]-[hash].[ext]
            if (/\.(png|jpe?g|gif|svg|webp|avif|ico)$/i.test(name)) {
              return "img/[name]-[hash][extname]";
            }

            // Шрифты → fonts/[name]-[hash].[ext]
            if (/\.(woff2?|ttf|otf|eot)$/i.test(name)) {
              return "fonts/[name]-[hash][extname]";
            }

            return "assets/[name]-[hash][extname]";
          },

          // JS чанки → js/[name]-[hash].js
          chunkFileNames: "js/[name]-[hash].js",
          entryFileNames: "js/[name]-[hash].js",

          // Code splitting: выносим вендоров в отдельные чанки
          // manualChunks(id) {
          //   if (id.includes("node_modules")) {
          //     if (id.includes("chart.js")) return "vendor-charts";
          //     if (id.includes("embla-carousel")) return "vendor-carousel";
          //     if (id.includes("glightbox")) return "vendor-lightbox";
          //     if (id.includes("countup.js")) return "vendor-countup";
          //     // Остальные node_modules — в общий vendor чанк
          //     return "vendor";
          //   }
          // },
        },
      },
    },

    // Плагины
    plugins: [
      // 1. Оптимизация изображений (сжатие PNG/JPG/SVG/WebP)
      ViteImageOptimizer({
        png: { quality: 80 },
        jpeg: { quality: 80 },
        jpg: { quality: 80 },
        webp: { lossless: false, quality: 80 },
        avif: { lossless: false, quality: 65 },
        svg: {
          plugins: [
            { name: "removeViewBox", active: false }, // Сохраняем viewBox
            { name: "removeEmptyAttrs", active: true },
          ],
        },
      }),

      // 2. Минификация HTML (убирает комментарии, пробелы)
      isProd &&
        ViteMinifyPlugin({
          removeComments: true,
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true,
        }),

      // 3. Gzip сжатие для production
      isProd &&
        compression({
          algorithm: "gzip",
          threshold: 1024, // Сжимаем только файлы > 1KB
          deleteOriginalAssets: false,
        }),

      // 4. Brotli сжатие (лучше gzip на 15-20%)
      isProd &&
        compression({
          algorithm: "brotliCompress",
          threshold: 1024,
          deleteOriginalAssets: false,
        }),

      // 5. Генерация sitemap.xml для SEO
      isProd &&
        Sitemap({
          hostname: "https://start-color.ru",
          dynamicRoutes: ["/", "/about", "/agreement", "/privacy"],
          exclude: ["/404", "/500"],
          readable: true,
        }),
    ].filter(Boolean),

    // Оптимизация: предзагрузка зависимостей
    optimizeDeps: {
      include: ["embla-carousel", "glightbox", "chart.js"],
    },
  };
});

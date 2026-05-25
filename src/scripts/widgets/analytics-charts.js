import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

import {
  fetchTrendData,
  fetchBrandsData,
  fetchColorsData,
} from "../services/mock-api.js";

export default function initAnalyticsCharts() {
  Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    LineController,
    BarController,
    Tooltip,
    Legend,
  );

  const trendCanvas = document.getElementById("trendChart");
  const brandsCanvas = document.getElementById("brandsChart");
  const colorsCanvas = document.getElementById("colorsChart");
  if (!trendCanvas || !brandsCanvas || !colorsCanvas) {
    return;
  }

  const charts = [];
  const numberFormatter = new Intl.NumberFormat("ru-RU");

  const getPalette = () => {
    const css = getComputedStyle(document.documentElement);
    return {
      axis: css.getPropertyValue("--font-clr-muted").trim() || "#7c89a1",
      label: css.getPropertyValue("--font-clr-heading").trim() || "#003b71",
      primary: css.getPropertyValue("--brand").trim() || "#0075c9",
      border: css.getPropertyValue("--grey-300").trim() || "#e4e5e9",
    };
  };

  const createBaseScale = (axisColor) => ({
    grid: {
      display: false,
      drawBorder: false,
      drawOnChartArea: false,
      drawTicks: false,
    },
    border: {
      display: false,
    },
    ticks: {
      color: axisColor,
    },
  });

  const buildCommonOptions = () => {
    const palette = getPalette();
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
          labels: {
            color: palette.label,
          },
        },
        tooltip: {
          callbacks: {
            label: (context) =>
              numberFormatter.format(context.parsed.x ?? context.parsed.y),
          },
        },
      },
      animation: {
        duration: 450,
      },
    };
  };

  const applyChartTheme = () => {
    const palette = getPalette();

    charts.forEach((chart) => {
      const defaultDataset = chart.data.datasets[0];
      if (!defaultDataset) {
        return;
      }

      if (chart.canvas.id === "trendChart") {
        defaultDataset.borderColor = palette.primary;
        defaultDataset.pointBackgroundColor = palette.primary;
      }

      if (chart.canvas.id === "brandsChart") {
        defaultDataset.backgroundColor = palette.primary;
      }

      chart.options.scales.x.ticks.color = palette.axis;
      chart.options.scales.y.ticks.color = palette.axis;
      chart.update();
    });
  };

  const renderCharts = async () => {
    const [trendData, brandsData, colorsData] = await Promise.all([
      fetchTrendData(),
      fetchBrandsData(),
      fetchColorsData(),
    ]);

    const palette = getPalette();

    const trendOptions = buildCommonOptions();
    trendOptions.scales = {
      x: createBaseScale(palette.axis),
      y: {
        ...createBaseScale(palette.axis),
        beginAtZero: true,
        ticks: {
          color: palette.axis,
          callback: (value) => numberFormatter.format(value),
        },
      },
    };

    charts.push(
      new Chart(trendCanvas, {
        type: "line",
        data: {
          labels: trendData.labels,
          datasets: [
            {
              data: trendData.values,
              borderColor: palette.primary,
              pointBackgroundColor: palette.primary,
              pointBorderColor: palette.primary,
              pointRadius: 2,
              pointHoverRadius: 4,
              borderWidth: 2,
              tension: 0.35,
              fill: false,
            },
          ],
        },
        options: trendOptions,
      }),
    );

    const brandsOptions = buildCommonOptions();
    brandsOptions.indexAxis = "y";
    brandsOptions.scales = {
      x: {
        ...createBaseScale(palette.axis),
        beginAtZero: true,
        ticks: {
          color: palette.axis,
          callback: (value) => numberFormatter.format(value),
        },
      },
      y: createBaseScale(palette.axis),
    };

    charts.push(
      new Chart(brandsCanvas, {
        type: "bar",
        data: {
          labels: brandsData.labels,
          datasets: [
            {
              data: brandsData.values,
              backgroundColor: palette.primary,
              borderRadius: 0,
              barPercentage: 0.72,
              categoryPercentage: 0.8,
            },
          ],
        },
        options: brandsOptions,
      }),
    );

    const colorsOptions = buildCommonOptions();
    colorsOptions.scales = {
      x: createBaseScale(palette.axis),
      y: {
        ...createBaseScale(palette.axis),
        beginAtZero: true,
        ticks: {
          color: palette.axis,
          callback: (value) => numberFormatter.format(value),
        },
      },
    };

    charts.push(
      new Chart(colorsCanvas, {
        type: "bar",
        data: {
          labels: colorsData.labels,
          datasets: [
            {
              data: colorsData.values,
              backgroundColor: colorsData.colors,
              borderRadius: 0,
              barPercentage: 0.72,
              categoryPercentage: 0.8,
            },
          ],
        },
        options: colorsOptions,
      }),
    );

    const themeToggler = document.getElementById("themeToggler");
    themeToggler?.addEventListener("toggle:change", applyChartTheme);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          renderCharts();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.1 },
  );

  observer.observe(trendCanvas.closest(".section__content"));
}

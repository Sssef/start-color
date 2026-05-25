// Мок запросы данных Счётчика, Графиков аналитики
// В продакшене заменить на реальные запросы
export async function fakeFetch(url, mockData) {
  try {
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
      throw new Error(`Mock backend unavailable: ${url}`);
    }
    return await response.json();
  } catch (_error) {
    await new Promise((resolve) => setTimeout(resolve, 220));
    return mockData;
  }
}

export async function fetchCounterData() {
  let serverCounter = 20237;
  const randomIncrement = Math.floor(Math.random() * 17) + 8;
  serverCounter += randomIncrement;
  await new Promise((resolve) => setTimeout(resolve, 160));
  return { value: serverCounter };
}

export async function fetchTrendData() {
  return fakeFetch("/api/analytics/trend", {
    labels: ["2023", "2024", "2025", "2026"],
    values: [300, 1600, 7000, 18500],
  });
}

export async function fetchBrandsData() {
  return fakeFetch("/api/analytics/brands", {
    labels: ["Cherry", "Mercedes", "Audi", "Skoda", "Toyota"],
    values: [320, 1280, 1010, 1100, 1810],
  });
}

export async function fetchColorsData() {
  return fakeFetch("/api/analytics/colors", {
    labels: ["RAL 9005", "RAL 5010", "RAL 3020", "RAL 6005", "Прочие"],
    values: [8200, 6600, 5200, 1400, 18600],
    colors: ["#000000", "#244699", "#d70000", "#0f6a33", "#b8c4d3"],
  });
}

// Мок данные для блока Оборудование
export const mockData = [
  {
    img: "/src/assets/images/tools/tool1.png",
    title: "MAT12 KOHINOOR",
    spec: [
      "Двенадцать углов измерения: r45as15, r45as25, r45as45, r45as75, r45as105, r45as110, r15as_45, r15as_15, r15as15, r15as45, r15as80, r45as_15;",
      "Возможность съемки текстурных данных;",
      "Доступно удаленное подключение (использование Wi-Fi).",
    ],
  },
  {
    img: "/src/assets/images/tools/tool2.png",
    title: "MAT12 QC",
    spec: [
      "Двенадцать углов измерения: r45as15, r45as25, r45as45, r45as75, r45as105, r45as110, r15as_45, r15as_15, r15as15, r15as45, r15as80, r45as_15;",
      "Возможность съемки текстурных данных;",
      "lorem ipsum dolor sit amen",
      "lorem ipsum dolor sit",
      "Доступно удаленное подключение (использование Wi-Fi).",
    ],
  },
  {
    img: "/src/assets/images/tools/tool3.png",
    title: "MA5 TOPAZ",
    spec: [
      "lorem ipsum",
      "Двенадцать углов измерения: r45as15, r45as25, r45as45, r45as75, r45as105, r45as110, r15as_45, r15as_15, r15as15, r15as45, r15as80, r45as_15;",
      "Возможность съемки текстурных данных;",
      "Доступно удаленное подключение (использование Wi-Fi).",
    ],
  },
  {
    img: "/src/assets/images/tools/tool4.png",
    title: "MAT6 KOHINOOR",
    spec: [
      "Двенадцать углов измерения: r45as15, r45as25, r45as45, r45as75, r45as105, r45as110, r15as_45, r15as_15, r15as15, r15as45, r15as80, r45as_15;",
      "Возможность съемки текстурных данных;",
    ],
  },
  {
    img: "/src/assets/images/tools/tool2.png",
    title: "MAT6 KOHINOO2",
    spec: [
      "Двенадцать углов измерения: r45as15, r45as25, r45as45, r45as75, r45as105, r45as110, r15as_45, r15as_15, r15as15, r15as45, r15as80, r45as_15;",
      "Возможность съемки текстурных данных;",
      "Возможность съемки текстурных данных;",
    ],
  },
];

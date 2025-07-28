import { quotes } from "./quotes";

const metrics = {
  en: {
    disciplineMetrics: "Discipline metrics",

    flow: "Flow",
    completion: "Completion",
    flawless: "Flawless",

    longestStreak: "Longest streak",
    longestStreakDescription: "Most consecutive days of rituals",

    currentStreak: "Current streak",
    currentStreakDescription: "Current consecutive days of rituals",

    flawlessDays: "Flawless days",
    flawlessDaysDescription:
      "Flawless Days - complete adherence to all rituals without exceptions",

    brokenRituals: "Broken rituals",
    brokenRitualsDescription: "Number of rituals that were broken",
  },
  ua: {
    disciplineMetrics: "Метрики дисципліни",

    flow: "Потік",
    completion: "Виконання",
    flawless: "Бездоганність",

    longestStreak: "Найдовший стрік",
    longestStreakDescription:
      "Максимальна кількість днів підряд, коли ритуали були виконані",

    currentStreak: "Поточний стрік",
    currentStreakDescription:
      "Поточна кількість днів підряд, коли ритуали були виконані",

    flawlessDays: "Безкомпромісні дні",
    flawlessDaysDescription:
      "Безкомпромісні дні - повне дотримання ритуалів без винятків",

    brokenRituals: "Зламані ритуали",
    brokenRitualsDescription:
      "Кількість ритуалів, які були розпочаті з нуля через пропуски",
  },
  ru: {
    disciplineMetrics: "Метрики дисциплины",

    flow: "Поток",
    completion: "Завершение",
    flawless: "Безупречность",

    longestStreak: "Самая длинная серия",
    longestStreakDescription:
      "Максимальное количество подряд идущих дней с выполненными ритуалами",

    currentStreak: "Текущая серия",
    currentStreakDescription:
      "Текущее количество подряд идущих дней с выполненными ритуалами",

    flawlessDays: "Бескомпромиссные дни",
    flawlessDaysDescription:
      "Бескомпромиссные дни - полное соблюдение ритуалов без исключений.",

    brokenRituals: "Сломанные ритуалы",
    brokenRitualsDescription:
      "Количество ритуалов, начатых заново из-за пропусков",
  },
};

const times = {
  en: {
    sevenDays: "7 days",
    thirtyDays: "30 days",
    threeHundredSixtyFiveDays: "365 days",
    allTime: "All time",
  },
  ua: {
    sevenDays: "7 днів",
    thirtyDays: "30 днів",
    threeHundredSixtyFiveDays: "365 днів",
    allTime: "Весь час",
  },
  ru: {
    sevenDays: "7 дней",
    thirtyDays: "30 дней",
    threeHundredSixtyFiveDays: "365 дней",
    allTime: "За всё время",
  },
};

export const proofOfWorkScreen = {
  en: {
    progressEvidence: "Progress Evidence",
    resultsNotPromises: "Results, not promises",
    proofs: "Proofs",

    ...times.en,
    ...metrics.en,
    ...quotes.en,

    phaseDistribution: "Phase distribution",
    locked: "Locked",
  },
  ua: {
    progressEvidence: "Докази прогресу",
    resultsNotPromises: "Результати, а не обіцянки",
    proofs: "Пруфи",

    ...times.ua,
    ...metrics.ua,
    ...quotes.ua,

    phaseDistribution: "Розподіл фаз",
    locked: "Заблоковано",
  },
  ru: {
    progressEvidence: "Доказательства прогресса",
    resultsNotPromises: "Результаты, а не обещания",
    proofs: "Доказательства",

    ...times.ru,
    ...metrics.ru,
    ...quotes.ru,

    phaseDistribution: "Распределение фаз",
    locked: "Заблокировано",
  },
};

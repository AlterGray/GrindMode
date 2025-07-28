import { quotes } from "./quotes";

const metrics = {
  en: {
    disciplineMetrics: "Discipline metrics",

    consistency: "Consistency",
    completion: "Completion",
    noMercy: "No mercy",

    longestStreak: "Longest streak",
    longestStreakDescription: "Most consecutive days of rituals",

    currentStreak: "Current streak",
    currentStreakDescription: "Current consecutive days of rituals",

    noMercyDays: "No mercy days",
    noMercyDaysDescription: "Days with rituals",

    brokenRituals: "Broken rituals",
    brokenRitualsDescription: "Number of rituals that were broken",
  },
  ua: {
    disciplineMetrics: "Метрики дисципліни",

    consistency: "Послідовність",
    completion: "Виконання",
    noMercy: "Безкомпромісність",

    longestStreak: "Найдовший стрік",
    longestStreakDescription:
      "Максимальна кількість днів підряд, коли ритуали були виконані",

    currentStreak: "Поточний стрік",
    currentStreakDescription:
      "Поточна кількість днів підряд, коли ритуали були виконані",

    noMercyDays: "Безкомпромісні дні",
    noMercyDaysDescription: "Дні, коли були ідеально виконані всі ритуали",

    brokenRituals: "Зламані ритуали",
    brokenRitualsDescription:
      "Кількість ритуалів, які були розпочаті з нуля через пропуски",
  },
  ru: {
    disciplineMetrics: "Метрики дисциплины",

    consistency: "Последовательность",
    completion: "Завершение",
    noMercy: "Бескомпромиссность",

    longestStreak: "Самая длинная серия",
    longestStreakDescription:
      "Максимальное количество подряд идущих дней с выполненными ритуалами",

    currentStreak: "Текущая серия",
    currentStreakDescription:
      "Текущее количество подряд идущих дней с выполненными ритуалами",

    noMercyDays: "Бескомпромиссные дни",
    noMercyDaysDescription:
      "Дни, в которые все ритуалы были выполнены идеально",

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
  },
  ua: {
    progressEvidence: "Докази прогресу",
    resultsNotPromises: "Результати, а не обіцянки",
    proofs: "Пруфи",

    ...times.ua,
    ...metrics.ua,
    ...quotes.ua,

    phaseDistribution: "Розподіл фаз",
  },
  ru: {
    progressEvidence: "Доказательства прогресса",
    resultsNotPromises: "Результаты, а не обещания",
    proofs: "Доказательства",

    ...times.ru,
    ...metrics.ru,
    ...quotes.ru,

    phaseDistribution: "Распределение фаз",
  },
};

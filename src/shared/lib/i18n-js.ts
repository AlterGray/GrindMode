import { I18n } from "i18n-js";

import { getLocales } from "expo-localization";

const buttons = {
  en: {
    create: "Create",
    cancel: "Cancel",
    confirm: "Confirm",
    remove: "Remove",
  },
  ua: {
    create: "Створити",
    cancel: "Скасувати",
    confirm: "Підтвердити",
    remove: "Видалити",
  },
  ru: {
    create: "Создать",
    cancel: "Отменить",
    confirm: "Подтвердить",
    remove: "Удалить",
  },
};

const dialogs = {
  en: {
    removeRitual: {
      removeRitual: "Remove ritual?",
      removeRitualDescription: "Also remove ritual proofs?",
    },
    removeFolder: {
      removeFolder: "Remove folder?",
      press: "Press",
      toConfirmOperation: "to confirm operation.",
      removeOperation: "Remove",
      confirmOperation: "Confirm",
    },
    create: {
      whatDoYouWantToCreate: "What do you want to create?",
      ritual: "Ritual",
      folder: "Folder",
    },
  },
  ua: {
    removeRitual: {
      removeRitual: "Видалити ритуал?",
      removeRitualDescription: "Також видалити пруфи ритуалу?",
    },
    removeFolder: {
      removeFolder: "Видалити папку?",
      press: "Натисніть",
      toConfirmOperation: "для підтвердження операції.",
      removeOperation: "Видалити",
      confirmOperation: "Підтвердити",
    },
    create: {
      whatDoYouWantToCreate: "Що бажаєте створити?",
      ritual: "Ритуал",
      folder: "Папку",
    },
  },
  ru: {
    removeRitual: {
      removeRitual: "Удалить ритуал?",
      removeRitualDescription: "Также удалить пруфы ритуала?",
    },
    removeFolder: {
      removeFolder: "Удалить папку?",
      press: "Нажмите",
      toConfirmOperation: "для подтверждения операции.",
      removeOperation: "Удалить",
      confirmOperation: "Подтвердить",
    },
    create: {
      whatDoYouWantToCreate: "Что хотите создать?",
      ritual: "Ритуал",
      folder: "Папку",
    },
  },
};

const statuses = {
  en: {
    incompleted: "Undone",
    completed: "Done",
    overdue: "Overdue",
    missed: "Missed",
  },
  ua: {
    incompleted: "Не початий",
    completed: "Виконаний",
    overdue: "Просрочений",
    missed: "Пропущений",
  },
  ru: {
    incompleted: "Недействительный",
    completed: "Выполненный",
    overdue: "Просроченный",
    missed: "Пропущенный",
  },
};

const phases = {
  en: {
    initiation: "Initiation",
    consolidation: "Consolidation",
    stabilization: "Stabilization",
    deepIntegration: "Deep integration",
  },
  ua: {
    initiation: "Ініціація",
    consolidation: "Консолідація",
    stabilization: "Стабілізація",
    deepIntegration: "Глибока інтеграція",
  },
  ru: {
    initiation: "Инициация",
    consolidation: "Консолидация",
    stabilization: "Стабилизация",
    deepIntegration: "Глубокая интеграция",
  },
};

const proofOfWorkScreen = {
  en: {
    proofsOfWork: "Proofs of Work",
    proofs: "Proofs",

    sevenDays: "7 days",
    thirtyDays: "30 days",
    threeHundredSixtyFiveDays: "365 days",
    allTime: "All time",

    disciplineMetrics: "Discipline metrics",
    consistency: "Consistency",
    completion: "Completion",
    noMercy: "No mercy",

    longestStreak: "Longest streak",
    currentStreak: "Current streak",
    noMercyDays: "No mercy days",
    brokenRituals: "Broken rituals",

    phaseDistribution: "Phase distribution",
  },
  ua: {
    proofsOfWork: "Пруфи роботи",
    proofs: "Пруфи",

    sevenDays: "7 днів",
    thirtyDays: "30 днів",
    threeHundredSixtyFiveDays: "365 днів",
    allTime: "Весь час",

    disciplineMetrics: "Метрики дисципліни",
    consistency: "Послідовність",
    completion: "Виконання",
    noMercy: "Ідеальність",

    longestStreak: "Найкращий стрік",
    currentStreak: "Поточний стрік",
    noMercyDays: "Ідеальні дні",
    brokenRituals: "Зломані ритуали",

    phaseDistribution: "Розподіл фаз",
  },
  ru: {
    proofsOfWork: "Пруфы работы",
    proofs: "Пруфы",

    sevenDays: "7 дней",
    thirtyDays: "30 дней",
    threeHundredSixtyFiveDays: "365 дней",
    allTime: "Всё время",

    disciplineMetrics: "Метрики дисциплины",
    consistency: "Послідовність",
    completion: "Виконання",
    noMercy: "Идеальность",

    longestStreak: "Наилучший стрик",
    currentStreak: "Текущий стрик",
    noMercyDays: "Идеальные дни",
    brokenRituals: "Сломанные ритуалы",

    phaseDistribution: "Распределение фаз",
  },
};

const folderPopovers = {
  en: {
    removeFromFolder: "Remove from folder",
    addToFolder: "Add to folder",
    moveToFolder: "Move to folder",
    removeFolder: "Remove folder",
    renameFolder: "Rename folder",
    reorderFolders: "Reorder folders",
  },
  ua: {
    removeFromFolder: "Видалити з папки",
    addToFolder: "Додати до папки",
    moveToFolder: "Перемістити в папку",
    removeFolder: "Видалити папку",
    renameFolder: "Перейменувати папку",
    reorderFolders: "Відсортувати папки",
  },
  ru: {
    removeFromFolder: "Удалить из папки",
    addToFolder: "Добавить в папку",
    moveToFolder: "Переместить в папку",
    removeFolder: "Удалить папку",
    renameFolder: "Переименовать папку",
    reorderFolders: "Отсортировать папки",
  },
};

const ritualsScreen = {
  en: {
    today: "Today",
    all: "All",
    dailyRituals: "Daily Rituals",
    noItemsYet: "No items yet",
    currentPhase: "Current Phase",
    startAt: "Start at",
    ...folderPopovers.en,
  },
  ua: {
    today: "Сьогодні",
    all: "Всі",
    dailyRituals: "Щоденні Ритуали",
    noItemsYet: "Ритуалів ще немає",
    currentPhase: "Поточна Фаза",
    startAt: "Початок в",
    ...folderPopovers.ua,
  },
  ru: {
    today: "Сегодня",
    all: "Все",
    dailyRituals: "Ежедневные Ритуали",
    noItemsYet: "Ритуалов пока нет",
    currentPhase: "Текущая Фаза",
    startAt: "Начало в",
    ...folderPopovers.ru,
  },
};

const ritualItemTime = {
  en: {
    noTimeLimits: "No time limits",
  },
  ua: {
    noTimeLimits: "Необмежений по часу",
  },
  ru: {
    noTimeLimits: "Неограниченный по времени",
  },
};

const allDialogs = {
  en: {
    ...dialogs.en.removeRitual,
    ...dialogs.en.removeFolder,
    ...dialogs.en.create,
  },
  ua: {
    ...dialogs.ua.removeRitual,
    ...dialogs.ua.removeFolder,
    ...dialogs.ua.create,
  },
  ru: {
    ...dialogs.ru.removeRitual,
    ...dialogs.ru.removeFolder,
    ...dialogs.ru.create,
  },
};

const ritualDays = {
  en: {
    sunday: "S",
    monday: "M",
    tuesday: "T",
    wednesday: "W",
    thursday: "T",
    friday: "F",
    saturday: "S",
  },
  ua: {
    sunday: "Н",
    monday: "П",
    tuesday: "В",
    wednesday: "С",
    thursday: "Ч",
    friday: "П",
    saturday: "С",
  },
  ru: {
    sunday: "В",
    monday: "П",
    tuesday: "В",
    wednesday: "С",
    thursday: "Ч",
    friday: "П",
    saturday: "С",
  },
};

const createUpdateRitualScreen = {
  en: {
    editRitual: "Edit Ritual",
    createRitual: "Create Ritual",

    ritualTitle: "Ritual text",
    isRitualTimeBased: "Is ritual time based?",
    ritualDays: "Ritual days",
    startRitualAt: "Start ritual at:",
    ritualDuration: "Ritual duration:",

    noLimit: "No limit",

    createFolder: "Create folder",
    enterNewFolderName: "Enter new folder name",
    folderColor: "Folder color",

    ...ritualDays.en,
  },
  ua: {
    editRitual: "Редагування Ритуалу",
    createRitual: "Створення Ритуалу",

    ritualTitle: "Текст ритуалу",
    isRitualTimeBased: "Чи ритуал має прив'язку часом?",
    ritualDays: "Дні ритуалу",
    startRitualAt: "Початок ритуалу в:",
    ritualDuration: "Тривалість ритуалу:",

    noLimit: "Немає ліміту",

    createFolder: "Створити папку",
    enterNewFolderName: "Введіть нове ім'я папки",
    folderColor: "Колір папки",

    ...ritualDays.ua,
  },
  ru: {
    editRitual: "Редактирование Ритуала",
    createRitual: "Создание Ритуала",

    ritualTitle: "Текст ритуала",
    isRitualTimeBased: "Имеет ли ритуал привязку к времени?",
    ritualDays: "Дни ритуала",
    startRitualAt: "Начало ритуала в:",
    ritualDuration: "Длительность ритуала:",

    noLimit: "Нет лимита",

    createFolder: "Создать папку",
    enterNewFolderName: "Введите новое имя папки",
    folderColor: "Цвет папки",

    ...ritualDays.ru,
  },
};

export const i18n = new I18n({
  en: {
    settings: "Settings",
    am: "ранку",
    pm: "ночі",
    hours: "h",
    minutes: "m",
    ...buttons.en,
    ...allDialogs.en,
    ...statuses.en,
    ...phases.en,
    ...proofOfWorkScreen.en,
    ...createUpdateRitualScreen.en,
    ...ritualsScreen.en,
    ...ritualItemTime.en,
  },
  ua: {
    settings: "Налаштування",
    am: "AM",
    pm: "PM",
    hours: "г",
    minutes: "хв",
    ...buttons.ua,
    ...allDialogs.ua,
    ...statuses.ua,
    ...phases.ua,
    ...proofOfWorkScreen.ua,
    ...createUpdateRitualScreen.ua,
    ...ritualsScreen.ua,
    ...ritualItemTime.ua,
  },
  ru: {
    settings: "Настройки",
    am: "утра",
    pm: "ночи",
    hours: "ч",
    minutes: "м",
    ...buttons.ru,
    ...allDialogs.ru,
    ...statuses.ru,
    ...phases.ru,
    ...proofOfWorkScreen.ru,
    ...createUpdateRitualScreen.ru,
    ...ritualsScreen.ru,
    ...ritualItemTime.ru,
  },
});

i18n.enableFallback = true;
i18n.locale = "ua";

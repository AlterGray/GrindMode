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

export const ritualsScreen = {
  en: {
    today: "Today",
    all: "All",
    dailyRituals: "Daily Rituals",
    noItemsYet: "No items yet",
    currentPhase: "Current Phase",
    startAt: "Start at",
    grindingForDays: "Grinding for {{days}} days",
    ...folderPopovers.en,
    ...ritualItemTime.en,
  },
  ua: {
    today: "Сьогодні",
    all: "Всі",
    dailyRituals: "Щоденні Ритуали",
    noItemsYet: "Ритуалів ще немає",
    currentPhase: "Поточна Фаза",
    startAt: "Початок в",
    grindingForDays: "Грінд протягом {{days}} днів",
    ...folderPopovers.ua,
    ...ritualItemTime.ua,
  },
  ru: {
    today: "Сегодня",
    all: "Все",
    dailyRituals: "Ежедневные Ритуали",
    noItemsYet: "Ритуалов пока нет",
    currentPhase: "Текущая Фаза",
    startAt: "Начало в",
    grindingForDays: "Гринд на протяжении {{days}} дней",
    ...folderPopovers.ru,
    ...ritualItemTime.ru,
  },
};

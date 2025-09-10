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
    noTimeLimits: "Час необмежений",
  },
  ru: {
    noTimeLimits: "Время не ограничено",
  },
};

export const ritualsScreen = {
  en: {
    todayFolder: "Today",
    allFolder: "All",
    dailyRituals: "Rituals",
    index: "Rituals",
    noItemsYet: "No items yet",
    currentPhase: "Current phase",
    startAt: "Start at",
    grindingForDays: "Grinding for {{days}} days",
    selectFolderArg: "Select folder: {{title}}",
    selectFolder: "Select folder",
    ...folderPopovers.en,
    ...ritualItemTime.en,
  },
  ua: {
    todayFolder: "Сьогодні",
    allFolder: "Всі",
    dailyRituals: "Ритуали",
    index: "Ритуали",
    noItemsYet: "Ритуалів ще немає",
    currentPhase: "Поточна фаза",
    startAt: "Початок в",
    grindingForDays: "Грінд протягом {{days}} днів",
    selectFolderArg: "Виберіть папку: {{title}}",
    selectFolder: "Виберіть папку",
    ...folderPopovers.ua,
    ...ritualItemTime.ua,
  },
  ru: {
    todayFolder: "Сегодня",
    allFolder: "Все",
    dailyRituals: "Ритуалы",
    index: "Ритуали",
    noItemsYet: "Ритуалов пока нет",
    currentPhase: "Текущая фаза",
    startAt: "Начало в",
    grindingForDays: "Гринд на протяжении {{days}} дней",
    selectFolderArg: "Выберите папку: {{title}}",
    selectFolder: "Выберите папку",
    ...folderPopovers.ru,
    ...ritualItemTime.ru,
  },
};

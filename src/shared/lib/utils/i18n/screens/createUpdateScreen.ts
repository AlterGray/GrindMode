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

export const createUpdateRitualScreen = {
  en: {
    ritualEditing: "Edit ritual",
    saveRitual: "Save",
    createRitual: "Create ritual",
    ritualCreating: "Create ritual",

    ritualText: "Ritual text",
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
    ritualEditing: "Редагування ритуалу",
    createRitual: "Створити ритуал",
    saveRitual: "Зберегти",
    ritualCreating: "Створення ритуалу",

    ritualText: "Текст ритуалу",
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
    ritualEditing: "Редактирование ритуала",
    createRitual: "Создать ритуал",
    ritualCreating: "Создание ритуала",
    saveRitual: "Сохранить",

    ritualText: "Текст ритуала",
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

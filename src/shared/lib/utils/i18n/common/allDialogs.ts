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

export const allDialogs = {
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

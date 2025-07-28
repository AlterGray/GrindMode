import { I18n } from "i18n-js";

import { getLocales } from "expo-localization";

import { allDialogs } from "./common/allDialogs";
import { buttons } from "./common/buttons";
import { phases } from "./common/phases";
import { statuses } from "./common/statuses";
import { tooltips } from "./common/tooltips";
import { words } from "./common/words";
import { createUpdateRitualScreen } from "./screens/createUpdateScreen";
import { ritualsScreen } from "./screens/dailyRitualsScreen";
import { proofOfWorkScreen } from "./screens/proofOfWorkScreen/proofOfWorkScreen";
import { settingsScreen } from "./screens/settingsScreen";

export const i18n = new I18n({
  en: {
    am: "ранку",
    pm: "ночі",
    hours: "h",
    minutes: "m",
    ...buttons.en,
    ...allDialogs.en,
    ...statuses.en,
    ...phases.en,
    ...tooltips.en,
    ...words.en,
    ...proofOfWorkScreen.en,
    ...createUpdateRitualScreen.en,
    ...ritualsScreen.en,
    ...settingsScreen.en,
  },
  ua: {
    am: "ранку",
    pm: "ночі",
    hours: "г",
    minutes: "хв",
    ...buttons.ua,
    ...allDialogs.ua,
    ...statuses.ua,
    ...phases.ua,
    ...tooltips.ua,
    ...words.ua,
    ...proofOfWorkScreen.ua,
    ...createUpdateRitualScreen.ua,
    ...ritualsScreen.ua,
    ...settingsScreen.ua,
  },
  ru: {
    am: "утра",
    pm: "ночи",
    hours: "ч",
    minutes: "м",
    ...buttons.ru,
    ...allDialogs.ru,
    ...statuses.ru,
    ...phases.ru,
    ...tooltips.ru,
    ...words.ru,
    ...proofOfWorkScreen.ru,
    ...createUpdateRitualScreen.ru,
    ...ritualsScreen.ru,
    ...settingsScreen.ru,
  },
});

i18n.enableFallback = true;

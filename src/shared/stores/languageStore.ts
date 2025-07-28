import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { makeMutable } from "react-native-reanimated";

import { getLocales } from "expo-localization";

import { useSubscribeStoreWithSelector } from "@shared/hooks/useSubscribeStoreWithSelector";
import { storage } from "@shared/lib/storage";
import { LanguageMode } from "@shared/types/commonTypes";

type LanguageStore = {
  language: LanguageMode;
  setLanguage: (language: LanguageMode) => void;
};

export const themeTransitionProgress = makeMutable(0);

const getLanguageFromStorage = () => {
  const languageString = storage.getString("language");
  if (languageString) {
    return JSON.parse(languageString);
  }

  return getLocales()[0].languageTag ?? "en";
};

export const useLanguageStore = create<LanguageStore>()(
  subscribeWithSelector(
    immer((set) => ({
      language: getLanguageFromStorage(),
      setLanguage: (language: LanguageMode) => {
        set((state) => {
          state.language = language;
        });
      },
      toggleLanguage: () => {
        set((state) => {
          if (state.language === "en") {
            state.language = "ua";
          } else {
            state.language = "en";
          }
        });
      },
    })),
  ),
);

export const useLanguageStoreWithSubscribe = () =>
  useSubscribeStoreWithSelector(
    useLanguageStore,
    (state) => state.language,
    "language",
  );

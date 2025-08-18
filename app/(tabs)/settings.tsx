import React from "react";
import { View } from "react-native";

import { useRitualStore } from "@features/rituals/ritualStore";
import { useRitualStatisticStore } from "@features/rituals/statisticStore";

import { i18n } from "@shared/lib/utils/i18n/i18n-js";
import { useLanguageStore } from "@shared/stores/languageStore";
import { useSettingsStore } from "@shared/stores/settingsStore";
import { useThemeStore } from "@shared/stores/themeStore";
import {
  FloatingModalVariant,
  HiddenTab,
  LanguageMode,
} from "@shared/types/commonTypes";
import AnimatedThemedText from "@shared/ui/AnimatedThemedText";
import AnimatedThemedView from "@shared/ui/AnimatedThemedView";
import CheckList from "@shared/ui/CheckList/CheckList";
import { useGlobalFloatingModalStore } from "@shared/ui/GlobalFloatingModal/GlobalFloatingModalStore";
import StyledButton from "@shared/ui/StyledButton";
import ToggleList from "@shared/ui/ToggleList/ToggleList";

const settings = () => {
  const { toggleTheme } = useThemeStore();
  const statistics = useRitualStatisticStore((state) => state.statistics);
  const openResetDialog = useGlobalFloatingModalStore(
    (state) => state.openModal,
  );
  const removeStatistic = useRitualStatisticStore(
    (state) => state.removeStatistic,
  );
  const removeRitual = useRitualStore((state) => state.removeRitual);

  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);

  const addHiddenTab = useSettingsStore((state) => state.addHiddenTab);
  const removeHiddenTab = useSettingsStore((state) => state.removeHiddenTab);

  const hiddenTabs = useSettingsStore((state) => state.hiddenTabs);

  const handleResetStatistic = () => {
    statistics.forEach((s) => removeStatistic(s.id));
    statistics.forEach((s) => removeRitual(s.id));
  };

  const handleOpenResetDialog = () => {
    openResetDialog({
      title: i18n.t("resetStatistics"),
      text: i18n.t("resetStatisticsDescription"),
      variant: FloatingModalVariant.Reset,
      onConfirm: handleResetStatistic,
    });
  };

  const handleSetHiddenTab = (tab: HiddenTab) => {
    if (hiddenTabs.includes(tab)) {
      removeHiddenTab(tab);
    } else {
      addHiddenTab(tab);
    }
  };

  return (
    <AnimatedThemedView className="flex-1 gap-4 py-3 px-6 w-full">
      <View className="flex-row items-center w-full justify-between">
        <AnimatedThemedText className="font-semibold">
          {i18n.t("switchTheme")}
        </AnimatedThemedText>
        <StyledButton title={i18n.t("switchTheme")} onPress={toggleTheme} />
      </View>

      <View className="flex-row items-center w-full justify-between">
        <AnimatedThemedText className="font-semibold">
          {i18n.t("resetStatistics")}
        </AnimatedThemedText>
        <StyledButton
          title={i18n.t("resetStatistics")}
          variant="remove-contained-20"
          onPress={handleOpenResetDialog}
        />
      </View>

      <View className="flex-row flex-wrap items-center w-full justify-between gap-y-2">
        <AnimatedThemedText className="font-semibold">
          {i18n.t("switchLanguage")}
        </AnimatedThemedText>
        <ToggleList
          options={[
            { label: i18n.t("english"), value: "en" },
            { label: i18n.t("ukrainian"), value: "ua" },
            { label: i18n.t("russian"), value: "ru" },
          ]}
          selectedOption={language}
          onPress={(value) => {
            i18n.locale = value;
            setLanguage(value as LanguageMode);
          }}
          horizontal
        />
      </View>

      <View className="flex-wrap w-full justify-between gap-1">
        {/* TODO MOVE IT TO THE CHECKLIST */}
        <AnimatedThemedText className="font-semibold">
          {i18n.t("displayTabs")}
        </AnimatedThemedText>
        <CheckList
          options={[
            { label: i18n.t("rituals"), value: "index" },
            { label: i18n.t("proofs"), value: "proofs" },
          ]}
          selectedOptions={hiddenTabs}
          onPress={(value) => handleSetHiddenTab(value as HiddenTab)}
          horizontal
        />
      </View>
    </AnimatedThemedView>
  );
};

export default settings;

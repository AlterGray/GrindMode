import React from "react";

import { useRitualStore } from "@features/rituals/ritualStore";
import { useRitualStatisticStore } from "@features/rituals/statisticStore";

import { useThemeStore } from "@shared/stores/themeStore";
import { FloatingModalVariant } from "@shared/types/commonTypes";
import AnimatedThemedView from "@shared/ui/AnimatedThemedView";
import { useGlobalFloatingModalStore } from "@shared/ui/GlobalFloatingModal/GlobalFloatingModalStore";
import StyledButton from "@shared/ui/StyledButton";

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

  const handleResetStatistic = () => {
    statistics.forEach((s) => removeStatistic(s.id));
    statistics.forEach((s) => removeRitual(s.id));
  };

  const handleOpenResetDialog = () => {
    openResetDialog({
      title: "Reset Statistics",
      variant: FloatingModalVariant.Danger,
      onConfirm: handleResetStatistic,
    });
  };

  return (
    <AnimatedThemedView className="flex-1 items-center justify-center gap-2">
      <StyledButton title="Switch theme" onPress={toggleTheme} />
      <StyledButton
        title="Reset Statistics"
        variant="remove-contained-20"
        onPress={handleOpenResetDialog}
      />
    </AnimatedThemedView>
  );
};

export default settings;

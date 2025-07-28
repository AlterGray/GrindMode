import React from "react";
import { View } from "react-native";

import { useRitualStatisticStore } from "@features/rituals/statisticStore";

import { useAnimatedSvgColor } from "@shared/hooks/useAnimatedSvgColor";
import { i18n } from "@shared/lib/utils/i18n/i18n-js";
import AnimatedThemedText from "@shared/ui/AnimatedThemedText";

import ProgressCircle from "./CirlceProgressBar/ProgressCircle";

// TODO add type?
type Props = {
  metrics: {
    completionRate: number;
    consistency: number;
    noMercy: number;
  };
};

const ProgressRow: React.FC<Props> = ({ metrics }) => {
  const statistics = useRitualStatisticStore((state) => state.statistics);

  // TODO implement statistic clear
  const isLocked =
    statistics.length === 0 ||
    statistics.every((s) => s.completitions.length === 0);

  const animatedProgressBarBg = useAnimatedSvgColor(
    "progressBarBackground",
    "stroke",
  );
  const animatedProgressBarColor = useAnimatedSvgColor(
    "progressBarProgress",
    "stroke",
  );

  // TODO DO SAME REFACTORING AS WITH SCREENS
  return (
    <View>
      {/* TODO CREATE HEADER VARIANT */}
      <AnimatedThemedText className="text-2xl font-medium mb-1">
        {i18n.t("disciplineMetrics")}
      </AnimatedThemedText>

      <View className="flex-row justify-around items-center mb-2">
        {/* TODO add sub label to show growth in % */}
        <ProgressCircle
          progress={metrics.consistency}
          label={i18n.t("consistency")}
          progressTitle={`${(metrics.consistency * 100).toFixed(metrics.consistency === 1 ? 0 : 2)}%`}
          scale={1.3}
          onPress={() => alert("There is no statistic yet")}
          isLocked={isLocked}
          animatedBgColor={animatedProgressBarBg}
          animatedProgressColor={animatedProgressBarColor}
        />

        {/* // TODO in order to have actual date we shouldn't clear completions but mark them as failed */}
        <ProgressCircle
          progress={metrics.completionRate}
          label={i18n.t("completion")}
          progressTitle={`${(metrics.completionRate * 100).toFixed(metrics.completionRate === 1 ? 0 : 2)}%`}
          scale={1.15}
          onPress={() => alert("There is no statistic yet")}
          isLocked={isLocked}
          animatedBgColor={animatedProgressBarBg}
          animatedProgressColor={animatedProgressBarColor}
        />

        <ProgressCircle
          progress={metrics.noMercy}
          label={i18n.t("noMercy")}
          progressTitle={`${(metrics.noMercy * 100).toFixed(metrics.noMercy === 1 ? 0 : 2)}%`}
          scale={1}
          onPress={() => alert("There is no statistic yet")}
          isLocked={isLocked}
          animatedBgColor={animatedProgressBarBg}
          animatedProgressColor={animatedProgressBarColor}
        />
      </View>
    </View>
  );
};

export default ProgressRow;

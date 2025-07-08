import React from "react";
import { View } from "react-native";

import { useRitualStatisticStore } from "@features/rituals/statisticStore";

import { useTheme } from "@shared/hooks/useTheme";
import AnimatedThemedText from "@shared/ui/ThemedText";

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
  const theme = useTheme();
  const statistics = useRitualStatisticStore((state) => state.statistics);

  // TODO use tailwind colors
  const backgroundColor = theme.colorScheme === "light" ? "#ccc" : "#444";
  const progressColor = theme.colorScheme === "light" ? "#555" : "#eee";

  // TODO implement statistic clear
  const isLocked =
    statistics.length === 0 ||
    statistics.every((s) => s.completitions.length === 0);

  return (
    <View>
      {/* TODO CREATE HEADER VARIANT */}
      <AnimatedThemedText className="text-2xl font-medium mb-1">
        Discipline metrics
      </AnimatedThemedText>

      <View className="flex-row justify-around items-center mb-2">
        {/* TODO add sub label to show growth in % */}
        <ProgressCircle
          progress={metrics.consistency}
          label="Consistency"
          progressTitle={`${(metrics.consistency * 100).toFixed(metrics.consistency === 1 ? 0 : 2)}%`}
          scale={1.3}
          onPress={() => alert("There is no statistic yet")}
          isLocked={isLocked}
          backgroundColor={backgroundColor}
          progressColor={progressColor}
        />

        {/* // TODO in order to have actual date we shouldn't clear completions but mark them as failed */}
        <ProgressCircle
          progress={metrics.completionRate}
          label="Completion"
          progressTitle={`${(metrics.completionRate * 100).toFixed(metrics.completionRate === 1 ? 0 : 2)}%`}
          scale={1.15}
          onPress={() => alert("There is no statistic yet")}
          isLocked={isLocked}
          backgroundColor={backgroundColor}
          progressColor={progressColor}
        />

        <ProgressCircle
          progress={metrics.noMercy}
          label={'"No mercy"'}
          progressTitle={`${(metrics.noMercy * 100).toFixed(metrics.noMercy === 1 ? 0 : 2)}%`}
          scale={1}
          onPress={() => alert("There is no statistic yet")}
          isLocked={isLocked}
          backgroundColor={backgroundColor}
          progressColor={progressColor}
        />
      </View>
    </View>
  );
};

export default ProgressRow;

import React from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";

import { Colors } from "@shared/constants/Colors";
import { i18n } from "@shared/lib/utils/i18n/i18n-js";
import { RitualStatuses } from "@shared/types/commonTypes";
import SeparatedProgressBar from "@shared/ui/ProgressBar/ProgressBar";
import { useProgressBarColors } from "@shared/ui/ProgressBar/useProgressBarColors";

import { Tooltip } from "./Tooltip";
import { RitualPhaseMap } from "./constants";
import {
  calculateRitualPhase,
  getAllRitualDays,
  getRitualPhaseMissedDays,
} from "./lib/utils";
import { RitualPhase } from "./ritualTypes";
import { getNextRitualPhase } from "./utils";

type PhaseBadgeProps = {
  ritualId: string;
};

const PhaseBadge: React.FC<PhaseBadgeProps> = ({ ritualId }) => {
  const phase = calculateRitualPhase(ritualId);
  const phaseItem = RitualPhaseMap[phase];
  const isInitiantion = phase === RitualPhase.Initiation;
  const isDeepIntegration = phase === RitualPhase.DeepIntegration;

  const adjustedPhaseFrom = isInitiantion ? phaseItem.from : phaseItem.from - 1;
  const allDays = getAllRitualDays(ritualId);
  const missedDaysIndexes = getRitualPhaseMissedDays(ritualId, phase);

  const doneDaysCount = allDays.length - adjustedPhaseFrom;
  const totalSteps = isDeepIntegration ? 2 : phaseItem.to - phaseItem.from;

  const animatedTextStyles = useProgressBarColors(
    Colors.ritualPhaseColors.light[phase],
    Colors.ritualPhaseColors.dark[phase],
  );

  const nextPhase = getNextRitualPhase(phase)!;
  const daysLeft = phaseItem.to - (adjustedPhaseFrom + doneDaysCount);

  return (
    // TODO rewrite all View to ThemedView?
    <View className="gap-1">
      <View className="flex-row gap-1">
        <Animated.Text style={animatedTextStyles}>
          {i18n.t("currentPhase")}: {phaseItem.label}
        </Animated.Text>

        <View className="flex-row gap-2">
          {/* // TODO add backround for all icons as there usually halls and user can see backround of under component */}
          {/* TODO remove slice and check by dates */}
          {allDays.slice(-14).filter((d) => d.status === RitualStatuses.Missed)
            .length > 0 && (
            <Tooltip text={i18n.t("oneMissLeft")} variant="danger" />
          )}
          {!isDeepIntegration && (
            <Tooltip
              text={`${daysLeft} days left until ${RitualPhaseMap[nextPhase].label} phase`}
            />
          )}
        </View>
      </View>

      {/* // TODO show missed days on progress bar */}

      {isDeepIntegration && (
        // TODO add pulsation
        <Animated.Text style={animatedTextStyles} className="font-bold">
          Grinding for {allDays.length} days
        </Animated.Text>
      )}
      <SeparatedProgressBar
        total={totalSteps}
        separatorWidth={isDeepIntegration ? 0 : 1}
        highlightedIndexes={isDeepIntegration ? [] : missedDaysIndexes}
        doneCount={doneDaysCount}
        width={380} // TODO make it responsive
        // TODO remove hardcode
        phase={phase}
      />
    </View>
  );
};

export default PhaseBadge;

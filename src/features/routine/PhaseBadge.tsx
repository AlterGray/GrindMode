import React from "react";
import { View } from "react-native";

import { Colors } from "@shared/constants/Colors";
import { useTheme } from "@shared/hooks/useTheme";
import { RoutineStatuses } from "@shared/types/commonTypes";
import { SeparatedProgressBar } from "@shared/ui/ProgressBar";
import ThemedText from "@shared/ui/ThemedText";

import { Tooltip } from "./Tooltip";
import { RoutinePhaseMap } from "./constants";
import {
  calculateRoutinePhase,
  getAllRoutineDays,
  getRoutinePhaseMissedDays,
} from "./lib/utils";
import { RoutinePhase } from "./routineTypes";
import { getNextRoutinePhase } from "./utils";

type PhaseBadgeProps = {
  routineId: string;
};

const PhaseBadge: React.FC<PhaseBadgeProps> = ({ routineId }) => {
  const { colorScheme } = useTheme();

  const phase = calculateRoutinePhase(routineId);
  const phaseItem = RoutinePhaseMap[phase];
  const isInitiantion = phase === RoutinePhase.Initiation;
  const isDeepIntegration = phase === RoutinePhase.DeepIntegration;

  const adjustedPhaseFrom = isInitiantion ? phaseItem.from : phaseItem.from - 1;
  const allDays = getAllRoutineDays(routineId);
  const missedDaysIndexes = getRoutinePhaseMissedDays(routineId, phase);

  const doneDaysCount = allDays.length - adjustedPhaseFrom;
  const totalSteps = isDeepIntegration ? 2 : phaseItem.to - phaseItem.from;
  const phaseColor = Colors.routinePhaseColors[phase][colorScheme];

  const nextPhase = getNextRoutinePhase(phase)!;
  const daysLeft = phaseItem.to - (adjustedPhaseFrom + doneDaysCount);

  return (
    // TODO rewrite all View to ThemedView?
    <View className="gap-1">
      <View className="flex-row gap-1">
        <ThemedText
          style={{ color: phaseColor }}
          className="text-base bg-emesald-100"
        >
          Curerent phase: {phaseItem.label}
        </ThemedText>

        <View className="flex-row gap-2">
          {/* // TODO add backround for all icons as there usually halls and user can see backround of under component */}
          {/* TODO remove slice and check by dates */}
          {allDays.slice(-14).filter((d) => d.status === RoutineStatuses.Missed)
            .length > 0 && (
            <Tooltip text="One miss left - stay consistent" variant="danger" />
          )}
          {!isDeepIntegration && (
            <Tooltip
              text={`${daysLeft} days left until ${RoutinePhaseMap[nextPhase].label} phase`}
            />
          )}
        </View>
      </View>

      {/* // TODO show missed days on progress bar */}

      {isDeepIntegration && (
        // TODO add pulsation
        <ThemedText style={{ color: phaseColor }} className="font-bold">
          Grinding for {allDays.length} days
        </ThemedText>
      )}
      <SeparatedProgressBar
        total={totalSteps}
        separatorWidth={isDeepIntegration ? 0 : 1}
        highlightedIndexes={isDeepIntegration ? [] : missedDaysIndexes}
        doneCount={doneDaysCount}
        width={380} // TODO make it responsive
        backgroundColor={phaseColor}
        // TODO remove hardcode
        separatorColor={"#e5e7eb"}
        colors={{ done: phaseColor, future: phaseColor }}
        highlightColor={"red"}
        backgroundColorOpacity={0.5}
      />
    </View>
  );
};

export default PhaseBadge;

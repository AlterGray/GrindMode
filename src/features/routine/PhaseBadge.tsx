import { View } from "react-native";

import { Colors } from "@shared/constants/Colors";
import { useTheme } from "@shared/hooks/useTheme";
import { SeparatedProgressBar } from "@shared/ui/ProgressBar";
import ThemedText from "@shared/ui/ThemedText";

import { Tooltip } from "./Tooltip";
import { RoutinePhaseMap } from "./constants";
import { RoutinePhase } from "./routineTypes";
import { getNextRoutinePhase } from "./utils";

type PhaseBadgeProps = {
  phase: RoutinePhase;
};

const PhaseBadge: React.FC<PhaseBadgeProps> = ({ phase }) => {
  const phaseItem = RoutinePhaseMap[phase];
  const { colorScheme } = useTheme();
  const phaseColor = Colors.routinePhaseColors[phase][colorScheme];

  const nextPhase = getNextRoutinePhase(phase)!;
  const nextPhaseColor = Colors.routinePhaseColors[nextPhase][colorScheme];

  // const color = Colors.routinePhaseColors[phase].light;
  // TODO hardcode
  const currentDays = 4;
  const daysLeft = phaseItem.to - currentDays;

  return (
    // TODO rewrite all View to ThemedView?
    <View className="gap-1">
      <View className="flex-row gap-1">
        <ThemedText style={{ color: phaseColor }} className="text-base">
          Curerent phase: {phaseItem.label}
        </ThemedText>

        <View className="flex-row gap-2">
          {/* // TODO add backround for all icons as there usually halls and user can see backround of under component */}
          <Tooltip text="One miss left - stay consistent" variant="danger" />
          <Tooltip
            text={`${daysLeft} days left until ${RoutinePhaseMap[nextPhase].label} phase`}
            iconColor={nextPhaseColor}
          />
        </View>
      </View>

      {/* // TODO show missed days on progress bar */}
      <SeparatedProgressBar
        segments={phaseItem.to - phaseItem.from}
        separatorWidth={phase === RoutinePhase.DeepIntegration ? 0 : 1}
        progress={(phaseItem.from + currentDays) / phaseItem.to}
        width={380} // TODO make it responsive
        fillColor={phaseColor}
        backgroundColor={Colors.light.background}
        separatorColor={"#e5e7eb"}
        backgroundOpacity={colorScheme === "light" ? 1 : 0.3}
      />
    </View>
  );
};

export default PhaseBadge;

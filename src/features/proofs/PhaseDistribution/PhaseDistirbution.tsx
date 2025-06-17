import { View } from "react-native";

import { RoutinePhaseMap } from "@features/routine/constants";
import { calculateRoutinePhase } from "@features/routine/lib/utils";
import { Routine, RoutinePhase } from "@features/routine/routineTypes";

import { useTheme } from "@shared/hooks/useTheme";
import { capitalize } from "@shared/lib/utils/common";
import ThemedText from "@shared/ui/ThemedText";

import LabeledProgressBar from "./LabeledProgressBar";

type PhaseDistirbutionProps = {
  rituals: Routine[];
};

const PhaseDistirbution: React.FC<PhaseDistirbutionProps> = ({ rituals }) => {
  const theme = useTheme();
  const progressColor = theme.colorScheme === "light" ? "#333" : "#fff";
  const backgroundColor = theme.colorScheme === "light" ? "#ccc" : "#444";

  const getPhaseDistribution = (phase: RoutinePhase) => {
    const phaseByName = rituals.filter(
      (s) => calculateRoutinePhase(s.id) === phase,
    );

    const totalPhases = rituals.map((s) => calculateRoutinePhase(s.id));

    return phaseByName.length / totalPhases.length;
  };

  Object.values(RoutinePhase).forEach((phase) => {
    getPhaseDistribution(phase);
  });

  const isLocked = rituals.length === 0;

  return (
    <View className="gap-4">
      <ThemedText className="text-2xl font-medium">
        Phase distribution
      </ThemedText>

      <View className="gap-2">
        {Object.values(RoutinePhase).map((phase) => (
          // TODO ADD LOCKED STATE
          <LabeledProgressBar
            key={phase}
            progress={isLocked ? 0 : getPhaseDistribution(phase)}
            label={capitalize(RoutinePhaseMap[phase].label)}
            progressColor={progressColor}
            backgroundColor={isLocked ? "#ccc" : backgroundColor}
          />
        ))}
      </View>
    </View>
  );
};

export default PhaseDistirbution;

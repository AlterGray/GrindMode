import { View } from "react-native";

import { RoutinePhaseMap } from "@features/routine/constants";
import { RoutinePhase } from "@features/routine/routineTypes";

import { useTheme } from "@shared/hooks/useTheme";
import { useThemeColors } from "@shared/hooks/useThemeColors";
import { capitalize } from "@shared/lib/utils/common";
import ThemedText from "@shared/ui/ThemedText";

import LabeledProgressBar from "./LabeledProgressBar";

type PhaseDistirbutionProps = {};

const PhaseDistirbution: React.FC<PhaseDistirbutionProps> = () => {
  const theme = useTheme();

  const progressColor = theme.colorScheme === "light" ? "#333" : "#fff";
  const backgroundColor = theme.colorScheme === "light" ? "#ccc" : "#444";

  return (
    <View className="gap-4">
      <ThemedText className="text-2xl font-medium">
        Phase distribution
      </ThemedText>

      <View className="gap-2">
        {Object.values(RoutinePhaseMap).map((phase) => (
          <LabeledProgressBar
            key={phase.label}
            progress={0.1}
            label={capitalize(phase.label)}
            progressColor={progressColor}
            backgroundColor={backgroundColor}
          />
        ))}
      </View>
    </View>
  );
};

export default PhaseDistirbution;

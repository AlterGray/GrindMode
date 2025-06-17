import { View } from "react-native";

import { RitualPhaseMap } from "@features/rituals/constants";
import { calculateRitualPhase } from "@features/rituals/lib/utils";
import { Ritual, RitualPhase } from "@features/rituals/ritualTypes";

import { useTheme } from "@shared/hooks/useTheme";
import { capitalize } from "@shared/lib/utils/common";
import ThemedText from "@shared/ui/ThemedText";

import LabeledProgressBar from "./LabeledProgressBar";

type PhaseDistirbutionProps = {
  rituals: Ritual[];
};

const PhaseDistirbution: React.FC<PhaseDistirbutionProps> = ({ rituals }) => {
  const theme = useTheme();
  const progressColor = theme.colorScheme === "light" ? "#333" : "#fff";
  const backgroundColor = theme.colorScheme === "light" ? "#ccc" : "#444";

  const getPhaseDistribution = (phase: RitualPhase) => {
    const phaseByName = rituals.filter(
      (s) => calculateRitualPhase(s.id) === phase,
    );

    const totalPhases = rituals.map((s) => calculateRitualPhase(s.id));

    return phaseByName.length / totalPhases.length;
  };

  Object.values(RitualPhase).forEach((phase) => {
    getPhaseDistribution(phase);
  });

  const isLocked = rituals.length === 0;

  return (
    <View className="gap-4">
      <ThemedText className="text-2xl font-medium">
        Phase distribution
      </ThemedText>

      <View className="gap-2">
        {Object.values(RitualPhase).map((phase) => (
          // TODO ADD LOCKED STATE
          <LabeledProgressBar
            key={phase}
            progress={isLocked ? 0 : getPhaseDistribution(phase)}
            label={capitalize(RitualPhaseMap[phase].label)}
            progressColor={progressColor}
            backgroundColor={isLocked ? "#ccc" : backgroundColor}
          />
        ))}
      </View>
    </View>
  );
};

export default PhaseDistirbution;

import { View } from "react-native";

import { RitualPhaseMap } from "@features/rituals/constants";
import { calculateRitualPhase } from "@features/rituals/lib/utils";
import { Ritual, RitualPhase } from "@features/rituals/ritualTypes";

import { useAnimatedSvgColor } from "@shared/hooks/useAnimatedSvgColor";
import { capitalize } from "@shared/lib/utils/common";
import { i18n } from "@shared/lib/utils/i18n/i18n-js";
import AnimatedThemedText from "@shared/ui/AnimatedThemedText";

import LabeledProgressBar from "./LabeledProgressBar";

type PhaseDistirbutionProps = {
  rituals: Ritual[];
};

const PhaseDistirbution: React.FC<PhaseDistirbutionProps> = ({ rituals }) => {
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

  const animatedProgressBarBg = useAnimatedSvgColor(
    "progressBarBackground",
    "stroke",
  );
  const animatedProgressBarColor = useAnimatedSvgColor(
    "progressBarProgress",
    "stroke",
  );

  return (
    <View className="gap-4">
      <AnimatedThemedText className="text-2xl font-medium">
        {i18n.t("phaseDistribution")}
      </AnimatedThemedText>

      <View className="gap-2">
        {Object.values(RitualPhase).map((phase) => (
          <LabeledProgressBar
            key={phase}
            progress={isLocked ? 0 : getPhaseDistribution(phase)}
            label={capitalize(i18n.t(RitualPhaseMap[phase].label))}
            animatedBgColor={animatedProgressBarBg}
            animatedProgressColor={animatedProgressBarColor}
          />
        ))}
      </View>
    </View>
  );
};

export default PhaseDistirbution;

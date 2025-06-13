import { View } from "react-native";

import { useTheme } from "@shared/hooks/useTheme";
import { useThemeColors } from "@shared/hooks/useThemeColors";
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
        <LabeledProgressBar
          progress={0.1}
          label="Phase 1"
          progressColor={progressColor}
          backgroundColor={backgroundColor}
        />
        <LabeledProgressBar
          progress={0.8}
          label="Phase 2"
          progressColor={progressColor}
          backgroundColor={backgroundColor}
        />
        <LabeledProgressBar
          progress={0.4}
          label="Phase 3"
          progressColor={progressColor}
          backgroundColor={backgroundColor}
        />
      </View>
    </View>
  );
};

export default PhaseDistirbution;

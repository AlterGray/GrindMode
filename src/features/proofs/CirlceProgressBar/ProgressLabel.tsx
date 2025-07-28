import { View } from "react-native";

import { useAnimatedColor } from "@shared/hooks/useAnimatedColor";
import AnimatedThemedText from "@shared/ui/AnimatedThemedText";
import AnimatedThemedView from "@shared/ui/AnimatedThemedView";

type ProgressLabelProps = {
  text: string;
  isLocked?: boolean;
};

// TODO make all reusable comnponents like this more "reusable" to extrack it to custom ui kit
const ProgressLabel: React.FC<ProgressLabelProps> = ({ text, isLocked }) => {
  const animatedBgColor = useAnimatedColor(isLocked ? "textMuted" : "white");
  return (
    <View className="flex-row items-center gap-2 max-w-[95%]">
      <AnimatedThemedView
        style={animatedBgColor}
        className={`w-2 h-2 rounded-md`}
      />
      <AnimatedThemedText
        color={isLocked ? "muted" : "primary"}
        adjustsFontSizeToFit
      >
        {text}
      </AnimatedThemedText>
    </View>
  );
};

export default ProgressLabel;

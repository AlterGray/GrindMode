import { View } from "react-native";

import ThemedText from "@shared/ui/ThemedText";

type ProgressLabelProps = {
  text: string;
  isLocked?: boolean;
};

const ProgressLabel: React.FC<ProgressLabelProps> = ({ text, isLocked }) => {
  return (
    <View className="flex-row items-center gap-2 max-w-[95%]">
      <View
        className={`w-2 h-2 rounded-md ${isLocked ? "bg-light-textMuted dark:bg-dark-textMuted" : "bg-black dark:bg-white"}`}
      ></View>
      <ThemedText color={isLocked ? "muted" : "primary"}>{text}</ThemedText>
    </View>
  );
};

export default ProgressLabel;

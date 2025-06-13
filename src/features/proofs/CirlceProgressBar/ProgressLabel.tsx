import { View } from "react-native";

import ThemedText from "@shared/ui/ThemedText";

type ProgressLabelProps = {
  text: string;
};

const ProgressLabel: React.FC<ProgressLabelProps> = ({ text }) => {
  return (
    <View className="flex-row items-center gap-2">
      <View className="w-2 h-2 bg-black rounded-md dark:bg-white"></View>
      <ThemedText>{text}</ThemedText>
    </View>
  );
};

export default ProgressLabel;

import { View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useThemeColors } from "@shared/hooks/useThemeColors";
import ThemedText from "@shared/ui/ThemedText";

type Props = {
  iconName: keyof typeof Ionicons.glyphMap;
  label: string;
  unlocked: boolean;
};

const AchievementItem: React.FC<Props> = ({ iconName, label, unlocked }) => {
  const colors = useThemeColors();
  const textColor = unlocked ? "#213" : "#666";

  return (
    <View className="items-center w-1/4 mb-4 px-2">
      <View className="size-14 rounded-full border items-center justify-center mb-1 bg-light-backgroundSecondary border-light-listItemBorder dark:bg-dark-backgroundSecondary">
        <Ionicons name={iconName} size={18} color={colors.icon} />
      </View>
      <ThemedText className="text-sm">{label}</ThemedText>
    </View>
  );
};

export default AchievementItem;

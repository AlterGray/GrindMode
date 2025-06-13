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

  return (
    <View className="items-center mb-4 w-1/4">
      <View className="size-20 rounded-full border items-center justify-center mb-1 bg-light-backgroundSecondary border-light-listItemBorder dark:bg-dark-backgroundSecondary">
        <Ionicons name={iconName} size={18} color={colors.icon} />
      </View>
      <ThemedText className="text-sm">{label}</ThemedText>
    </View>
  );
};

export default AchievementItem;

import { View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useThemeColors } from "@shared/hooks/useThemeColors";
import { IoniconsName } from "@shared/types/commonTypes";
import AnimatedThemedText from "@shared/ui/AnimatedThemedText";

type Props = {
  iconName: IoniconsName;
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
      <AnimatedThemedText className="text-sm">{label}</AnimatedThemedText>
    </View>
  );
};

export default AchievementItem;

import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import ThemedText from "../ThemedText";

type NavModalListItemProps = {
  onPress: () => void;
  iconName?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  title: string;
  isMarked?: boolean;
};

const NavModalListItem: React.FC<NavModalListItemProps> = ({
  onPress,
  iconName,
  iconColor,
  title,
  isMarked = false,
}) => {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Select folder: ${title}`}
      className="flex-row items-center justify-between gap-8 bg-light-backgroundSurface dark:bg-dark-backgroundSurface"
    >
      <View className="flex-row items-center gap-8">
        {iconName && <Ionicons name={iconName} size={24} color={iconColor} />}
        <ThemedText
          className={`${!iconName && "ml-16"}`}
          style={{ color: iconColor }}
        >
          {title}
        </ThemedText>
      </View>
      {isMarked && <Ionicons name="checkmark" size={24} color={iconColor} />}
    </Pressable>
  );
};

export default NavModalListItem;

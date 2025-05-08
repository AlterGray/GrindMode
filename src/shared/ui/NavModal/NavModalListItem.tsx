import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import ThemedText from "../ThemedText";
import { Colors } from "@/constants/Colors";
import { useThemeStore } from "@shared/stores/themeStore";

type NavModalListItemProps = {
  onPress: () => void;
  iconName?: keyof typeof Ionicons.glyphMap;
  title: string;
};

const NavModalListItem: React.FC<NavModalListItemProps> = ({
  onPress,
  iconName,
  title,
}) => {
  const { colorScheme } = useThemeStore();
  const theme = Colors[colorScheme];
  const iconColor = theme.icon;

  return (
    <View>
      <Pressable
        onPress={onPress}
        className="flex-row items-center gap-8 bg-light-backgroundSurface dark:bg-dark-backgroundSurface"
      >
        {iconName && <Ionicons name={iconName} size={24} color={iconColor} />}
        <ThemedText className={`${!iconName && "ml-16"}`}>{title}</ThemedText>
      </Pressable>
    </View>
  );
};

export default NavModalListItem;

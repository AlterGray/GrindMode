import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import ThemedText from "../ThemedText";

type NavModalListItemProps = {
  onPress: () => void;
  iconName?: keyof typeof Ionicons.glyphMap;
  title: string;
};

const NavModalListItem: React.FC<NavModalListItemProps> = ({
  onPress,
  iconName,
  title,
}) => (
  <View>
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-8 bg-light-backgroundSurface"
    >
      {iconName && <Ionicons name={iconName} size={24} color="black" />}
      <ThemedText className={`${!iconName && "ml-16"}`}>{title}</ThemedText>
    </Pressable>
  </View>
);

export default NavModalListItem;

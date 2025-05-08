import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useThemeStore } from "@shared/stores/themeStore";
import ThemedText from "@shared/ui/ThemedText";
import React from "react";
import { View } from "react-native";
import { Pressable } from "react-native";

type FolderListItemProps = {
  title: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
};

const FolderListItem: React.FC<FolderListItemProps> = ({
  title,
  iconName,
  onPress,
}) => {
  const { colorScheme } = useThemeStore();
  const theme = Colors[colorScheme];
  const iconColor = theme.icon;

  return (
    <View>
      <Pressable onPress={onPress} className="flex-row items-center gap-8">
        <Ionicons name={iconName} size={24} color={iconColor} />
        <ThemedText>{title}</ThemedText>
      </Pressable>
    </View>
  );
};

export default FolderListItem;

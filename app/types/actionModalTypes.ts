import { Ionicons } from "@expo/vector-icons";

export type ActionType = {
  onPress: () => void;
  iconName: keyof typeof Ionicons.glyphMap;
};
import { useActionModalStore } from "@ui/ActionsModal/actionsModalStore";
import { useThemeStore } from "@shared/stores/themeStore";
import { Colors } from "@/constants/Colors";
import { ViewStyle } from "react-native";

export const useTab = () => {
  const isActionModalOpened = useActionModalStore((state) => state.isOpen);
  const { colorScheme } = useThemeStore();

  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  return {
    pointerEvents: isActionModalOpened
      ? ("none" as ViewStyle["pointerEvents"])
      : ("auto" as ViewStyle["pointerEvents"]),
    iconColor: isActionModalOpened ? theme.disabledTab : theme.tabActive,
  };
};

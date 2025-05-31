import { ViewStyle } from "react-native";

import { Colors } from "@shared/constants/Colors";
import { useActionModalStore } from "@shared/ui/ActionsModal/actionsModalStore";

import { useTheme } from "./useTheme";

export const useTab = () => {
  const isActionModalOpened = useActionModalStore((state) => state.isOpen);
  const { colorScheme } = useTheme();

  const theme = Colors[colorScheme];

  return {
    pointerEvents: isActionModalOpened
      ? ("none" as ViewStyle["pointerEvents"])
      : ("auto" as ViewStyle["pointerEvents"]),
    iconColor: isActionModalOpened ? theme.disabledTab : theme.tabActive,
  };
};

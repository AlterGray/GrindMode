import React, { useEffect } from "react";
import { ThemedView } from "../ThemedView";
import IconButton from "../IconButton";
import { ThemedText } from "../ThemedText";
import { useActionModalStore } from "@/stores/actionsModalStore";
import { useThemeStore } from "@/stores/themeStore";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const ActionModal = () => {
  const { isOpen, setIsOpen, text, actions, onCloseDialog } =
    useActionModalStore();
  const isDark = useThemeStore((state) => state.isDark);

  const iconColor = isDark ? Colors.dark.icon : Colors.light.icon;
  const bgColor =
    "dark:bg-dark-backgroundSecondary bg-light-backgroundSecondary";

  useEffect(() => {
    if (!isOpen) {
      onCloseDialog();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ThemedView
      className={`${bgColor} w-full flex-row items-center justify-between p-1`}
    >
      {/* Header section */}
      <ThemedView className="h-16 flex-row items-center justify-between gap-6 bg-light-backgroundSecondary px-4 dark:bg-dark-backgroundSecondary">
        <IconButton
          iconName="close-outline"
          onPress={() => setIsOpen(false)}
          color={iconColor}
        />
        {text && (
          <ThemedText className="text-base font-medium">{text}</ThemedText>
        )}
      </ThemedView>

      {/* Actions */}
      {actions.length !== 0 && (
        <ThemedView className="flex-row gap-6 bg-light-backgroundSecondary px-4 py-2 dark:bg-dark-backgroundSecondary">
          {actions.map((action) => (
            <Ionicons
              key={action.iconName}
              name={action.iconName}
              onPress={action.onPress}
              color={iconColor}
              size={26}
            />
          ))}
        </ThemedView>
      )}
    </ThemedView>
  );
};

export default ActionModal;

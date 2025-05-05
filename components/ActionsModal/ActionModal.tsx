import React, { useEffect } from "react";
import { ThemedView } from "../common/ThemedView";
import IconButton from "../common/IconButton";
import ThemedText from "../common/ThemedText";
import { useActionModalStore } from "@/stores/actionsModalStore";
import { useThemeStore } from "@/stores/themeStore";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const ActionModal = () => {
  const { isOpen, setIsOpen, text, actions, onCloseDialog } =
    useActionModalStore();
  const isDark = useThemeStore((state) => state.isDark);

  const iconColor = isDark ? Colors.dark.icon : Colors.light.icon;

  useEffect(() => {
    if (!isOpen) {
      onCloseDialog();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ThemedView
      className={[
        "w-full flex-row items-center justify-between p-1",
        "bg-light-backgroundSecondary dark:bg-dark-backgroundSecondary",
      ].join(" ")}
    >
      {/* Header section */}
      <ThemedView
        className={[
          "h-16 flex-row items-center justify-between gap-6",
          "bg-light-backgroundSecondary px-4 dark:bg-dark-backgroundSecondary",
        ].join(" ")}
      >
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

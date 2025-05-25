import React from "react";
import ThemedView from "@ui/ThemedView";
import IconButton from "@ui/IconButton";
import ThemedText from "@ui/ThemedText";
import { useActionModalStore } from "./actionsModalStore";
import { useThemeStore } from "@shared/stores/themeStore";
import { Colors } from "@/constants/Colors";
import ActionModalActions from "./ActionButtons";

const ActionModal = () => {
  const { isOpen, closeActionModal, text, actions } = useActionModalStore();
  const isDark = useThemeStore((state) => state.isDark);

  const iconColor = isDark ? Colors.dark.icon : Colors.light.icon;

  if (!isOpen) return null;

  // TODO rewrite with <Modal />
  // TODO use router stack?
  return (
    <ThemedView
      className={[
        "absolute w-full flex-row items-center justify-between py-1",
        "bg-light-backgroundSurface dark:bg-dark-backgroundSurface",
      ].join(" ")}
    >
      {/* Header section */}
      <ThemedView
        className={[
          "h-16 flex-row items-center justify-between gap-6",
          "bg-light-backgroundSurface px-4 dark:bg-dark-backgroundSurface",
        ].join(" ")}
      >
        {/* TODO add effect on touch */}
        <IconButton
          iconName="close-outline"
          onPress={closeActionModal}
          color={iconColor}
        />
        {text && (
          <ThemedText className="text-base font-medium">{text}</ThemedText>
        )}
      </ThemedView>

      <ActionModalActions staticActions={actions} iconColor={iconColor} />
    </ThemedView>
  );
};

export default ActionModal;

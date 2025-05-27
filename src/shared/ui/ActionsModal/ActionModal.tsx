import React from "react";
import ThemedView from "@ui/ThemedView";
import { useActionModalStore } from "./actionsModalStore";
import { useThemeStore } from "@shared/stores/themeStore";
import { Colors } from "@/constants/Colors";
import ActionModalButtons from "./ActionModalButtons";
import CloseButtonAndText from "./CloseButtonAndText";

const ActionModal = () => {
  const { isOpen } = useActionModalStore();
  const isDark = useThemeStore((state) => state.isDark);
  const iconColor = isDark ? Colors.dark.icon : Colors.light.icon;

  if (!isOpen) return null;

  const containerClasses = [
    "absolute w-full flex-row items-center justify-between py-1",
    "bg-light-backgroundSurface dark:bg-dark-backgroundSurface",
  ].join(" ");

  // TODO rewrite with <Modal />
  // TODO use router stack?
  return (
    <ThemedView className={containerClasses}>
      <CloseButtonAndText iconColor={iconColor} />
      <ActionModalButtons iconColor={iconColor} />
    </ThemedView>
  );
};

export default ActionModal;

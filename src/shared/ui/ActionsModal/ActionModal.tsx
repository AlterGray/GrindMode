import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useThemeColors } from "@shared/hooks/useThemeColors";
import AnimatedThemedView from "@shared/ui/AnimatedThemedView";

import ActionModalButtons from "./ActionModalButtons";
import CloseButtonAndText from "./CloseButtonAndText";
import { useActionModalStore } from "./actionsModalStore";

const ActionModal = () => {
  const { isOpen } = useActionModalStore();
  const iconColor = useThemeColors("icon");
  const insets = useSafeAreaInsets();

  if (!isOpen) return null;

  const containerClasses = [
    "absolute w-full flex-row items-center justify-between py-1",
    "bg-light-backgroundSurface dark:bg-dark-backgroundSurface",
    "border-b-2 dark:border-b-dark-listItemBorder",
  ].join(" ");

  // TODO rewrite with <Modal />
  // TODO use router stack?
  return (
    <AnimatedThemedView
      className={containerClasses}
      style={{ top: insets.top }}
    >
      <CloseButtonAndText iconColor={iconColor} />
      <ActionModalButtons iconColor={iconColor} />
    </AnimatedThemedView>
  );
};

export default ActionModal;

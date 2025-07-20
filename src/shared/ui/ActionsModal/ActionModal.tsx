import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useThemeColors } from "@shared/hooks/useThemeColors";
import ThemedView from "@shared/ui/ThemedView";

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
  ].join(" ");

  // TODO rewrite with <Modal />
  // TODO use router stack?
  return (
    <ThemedView className={containerClasses} style={{ top: insets.top }}>
      <CloseButtonAndText iconColor={iconColor} />
      <ActionModalButtons iconColor={iconColor} />
    </ThemedView>
  );
};

export default ActionModal;

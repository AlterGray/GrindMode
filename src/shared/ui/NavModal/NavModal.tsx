import React from "react";
import { Modal, Pressable } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import ThemedText from "@shared/ui/ThemedText";
import ThemedView from "@shared/ui/ThemedView";

import ActionList, { Action } from "./ActionList";

// Types
type ModalListItemProps = {
  title: string;
  onPress: () => void;
  iconName?: keyof typeof Ionicons.glyphMap;
};

type NavModalProps = {
  title: string;
  actions: Action[];
  CustomListItem?: React.ComponentType<ModalListItemProps>;
  isVisible: boolean;
  onClose: () => void;
};

const NavModal: React.FC<NavModalProps> = ({
  title,
  actions,
  isVisible,
  onClose,
}) => {
  return (
    <Modal transparent animationType="slide" visible={isVisible}>
      <Pressable onPress={onClose} className="absolute inset-0" />

      <ThemedView className="absolute bottom-0 w-full gap-4 bg-light-backgroundSurface px-4 py-4 dark:bg-dark-backgroundSurface">
        <ThemedText className="ml-8" variant="h4">
          {title}
        </ThemedText>

        <ActionList actions={actions} />
      </ThemedView>
    </Modal>
  );
};

export default NavModal;

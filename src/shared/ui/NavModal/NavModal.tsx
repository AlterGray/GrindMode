import React from "react";
import { Modal, Pressable } from "react-native";

import { IoniconsName } from "@shared/types/commonTypes";
import AnimatedThemedText from "@shared/ui/AnimatedThemedText";
import AnimatedThemedView from "@shared/ui/AnimatedThemedView";

import ActionList, { Action } from "./ActionList";

// Types
type ModalListItemProps = {
  title: string;
  onPress: () => void;
  iconName?: IoniconsName;
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

      <AnimatedThemedView
        className="absolute bottom-0 w-full gap-4 px-4 py-4"
        backgroundColor="secondary"
      >
        <AnimatedThemedText className="ml-8" variant="h4">
          {title}
        </AnimatedThemedText>

        <ActionList actions={actions} />
      </AnimatedThemedView>
    </Modal>
  );
};

export default NavModal;

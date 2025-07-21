import React from "react";
import { Modal } from "react-native";

import {
  ButtonProps,
  FloatingModalVariantType,
} from "@shared/types/commonTypes";
import AnimatedThemedText from "@shared/ui/ThemedText";

import Backdrop from "./components/Backdrop";
import Container from "./components/Container";
import Controls from "./components/Controls";
import { getModalConfig } from "./utils";

type FloatingModalProps = {
  isOpen: boolean;
  title: string;
  renderContent: () => React.ReactNode;
  primaryButton?: ButtonProps;
  secondaryButton?: ButtonProps;
  variant: FloatingModalVariantType;
  onConfirm?: () => void;
  onCancel: () => void;
};

const FloatingModal: React.FC<FloatingModalProps> = ({
  isOpen,
  title,
  renderContent,
  primaryButton,
  secondaryButton,
  variant,
  onConfirm,
  onCancel,
}) => {
  const { primary, secondary, controlsVariant } = getModalConfig(variant);
  return (
    <Modal transparent visible={isOpen} animationType="fade">
      <Backdrop onCancel={onCancel} />
      <Container>
        <AnimatedThemedText className="mb-1 text-lg font-medium">
          {title}
        </AnimatedThemedText>

        {renderContent()}

        <Controls
          primary={primaryButton ?? primary}
          secondary={secondaryButton ?? secondary}
          onCancel={onCancel}
          onConfirm={onConfirm}
          variant={controlsVariant}
        />
      </Container>
    </Modal>
  );
};

export default FloatingModal;

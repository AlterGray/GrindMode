import React from "react";
import { Modal } from "react-native";
import useConfirmModalStore from "../../ConfirmModalStore";
import { getModalConfig } from "../../utils";
import ConfirmDialogTitle from "../ConfirmModalTitle";
import ConfirmModalControls from "../ConfirmModalControls";
import ConfirmModalContainer from "../ConfirmModalContainer";
import ConfirmModalBackdrop from "../ConfirmModalBackdrop";

type ConfirmDialogProps = {
  onConfirmData?: string;
  children: React.ReactNode;
};

const BaseConfirmModal: React.FC<ConfirmDialogProps> = ({
  onConfirmData = "",
  children,
}) => {
  const dialog = useConfirmModalStore();
  const config = getModalConfig(dialog.variant);

  return (
    <Modal transparent visible={dialog.isOpen} animationType="fade">
      <ConfirmModalBackdrop onCancel={dialog.onCancel} />
      <ConfirmModalContainer>
        <ConfirmDialogTitle text={dialog.title} />

        {children}

        <ConfirmModalControls
          primary={config.primary}
          secondary={config.secondary}
          onCancel={dialog.onCancel}
          onConfirm={() => dialog.onConfirm(onConfirmData)}
        />
      </ConfirmModalContainer>
    </Modal>
  );
};

export default BaseConfirmModal;

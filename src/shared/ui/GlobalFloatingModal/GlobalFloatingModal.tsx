import FloatingModal from "@shared/ui/FloatingModal/FloatingModal";
import { getModalConfig } from "@shared/ui/FloatingModal/utils";
import ThemedText from "@shared/ui/ThemedText";

import { useGlobalFloatingModalStore } from "./GlobalFloatingModalStore";

const GlobalFloatingModal: React.FC = () => {
  const { isOpen, title, text, variant, onConfirm, onCancel, closeModal } =
    useGlobalFloatingModalStore();

  const defaultText = getModalConfig(variant).message;

  const renderText = () => <ThemedText>{text ?? defaultText}</ThemedText>;

  const handleConfirm = () => {
    onConfirm();
    closeModal();
  };

  const handleCancel = () => {
    onCancel();
    closeModal();
  };

  return (
    <FloatingModal
      isOpen={isOpen}
      title={title}
      renderContent={renderText}
      variant={variant}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  );
};

export default GlobalFloatingModal;

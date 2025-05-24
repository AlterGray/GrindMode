import ThemedText from "@shared/ui/ThemedText";
import BaseConfirmModal from "./BaseConfirmModal";
import useConfirmModalStore from "../../ConfirmModalStore";

const MessageConfirmModal: React.FC = () => {
  const message = useConfirmModalStore((state) => state.message);
  const defaultMessage = "This action cannot be undone.";
  const resultMessage = message ?? defaultMessage;
  return (
    <BaseConfirmModal>
      <ThemedText className="text-muted mb-4 text-sm">
        {resultMessage}
      </ThemedText>
    </BaseConfirmModal>
  );
};

export default MessageConfirmModal;

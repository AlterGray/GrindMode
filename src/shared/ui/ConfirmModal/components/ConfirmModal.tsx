import useConfirmModalStore from "../ConfirmModalStore";
import { ConfirmModalVariant } from "../types";
import CustomConfirmModal from "./variants/CustomConfirmModal";
import InputConfirmModal from "./variants/InputConfirmModal";
import MessageConfirmModal from "./variants/MessageConfirmModal";

const ConfirmModal: React.FC = () => {
  const variant = useConfirmModalStore((state) => state.variant);

  switch (variant) {
    case ConfirmModalVariant.Input:
      return <InputConfirmModal />;
    case ConfirmModalVariant.Custom:
      return <CustomConfirmModal />;
    case ConfirmModalVariant.Confirm:
    case ConfirmModalVariant.Remove:
      return <MessageConfirmModal />;
    default:
      return null;
  }
};
export default ConfirmModal;

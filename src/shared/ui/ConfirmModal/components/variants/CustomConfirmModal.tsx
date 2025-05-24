import React from "react";
import BaseConfirmModal from "./BaseConfirmModal";
import useConfirmModalStore from "../../ConfirmModalStore";

const CustomConfirmModal: React.FC = () => {
  const message = useConfirmModalStore((state) => state.message);

  return <BaseConfirmModal>{message}</BaseConfirmModal>;
};

export default CustomConfirmModal;

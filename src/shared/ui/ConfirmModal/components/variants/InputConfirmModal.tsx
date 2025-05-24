import React, { useEffect, useState } from "react";
import BaseConfirmModal from "./BaseConfirmModal";
import StyledInput from "../../../StyledInput";
import useConfirmModalStore from "../../ConfirmModalStore";

const InputConfirmModal: React.FC = () => {
  const initialValue = useConfirmModalStore((state) => state.initialValue);
  const [inputText, setInputText] = useState(initialValue);

  useEffect(() => setInputText(initialValue), [initialValue]);

  return (
    <BaseConfirmModal onConfirmData={inputText}>
      <StyledInput value={inputText} onChangeText={setInputText} />
    </BaseConfirmModal>
  );
};

export default InputConfirmModal;

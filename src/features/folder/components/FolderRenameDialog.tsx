import { useEffect, useState } from "react";

import { FloatingModalVariant } from "@shared/types/commonTypes";
import FloatingModal from "@shared/ui/FloatingModal/FloatingModal";
import StyledInput from "@shared/ui/StyledInput";

type FolderRenameDialogProps = {
  isOpen: boolean;
  initialValue: string;
  onConfirm: (name: string) => void;
  onCancel: () => void;
};

const FolderRenameDialog: React.FC<FolderRenameDialogProps> = ({
  isOpen,
  initialValue,
  onConfirm,
  onCancel,
}) => {
  const [name, setName] = useState(initialValue);

  // TODO don't need?
  useEffect(() => setName(initialValue), [initialValue]);

  const input = () => <StyledInput value={name} onChangeText={setName} />;

  return (
    <FloatingModal
      isOpen={isOpen}
      title="Enter new folder name"
      renderContent={input}
      variant={FloatingModalVariant.Confirm}
      onConfirm={() => onConfirm(name)}
      onCancel={onCancel}
    />
  );
};

export default FolderRenameDialog;

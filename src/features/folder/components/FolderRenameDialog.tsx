import { useState } from "react";

import { i18n } from "@shared/lib/utils/i18n/i18n-js";
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

  const getInput = () => (
    <StyledInput value={name} onChangeText={setName} autoFocus />
  );

  return (
    <FloatingModal
      isOpen={isOpen}
      title={i18n.t("enterNewFolderName")}
      renderContent={getInput}
      variant={FloatingModalVariant.Confirm}
      onConfirm={() => onConfirm(name)}
      onCancel={onCancel}
    />
  );
};

export default FolderRenameDialog;

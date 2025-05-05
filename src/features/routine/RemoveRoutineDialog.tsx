import ConfirmDialog from "@ui/ConfirmDialog";

type RemoveRoutineDialogProps = {
  isOpen?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const RemoveRoutineDialog: React.FC<RemoveRoutineDialogProps> = ({
  isOpen = false,
  onConfirm,
  onCancel,
}) => {
  return (
    <ConfirmDialog
      isVisible={isOpen}
      onConfirm={onConfirm}
      onCancel={onCancel}
      primaryButtonColor="danger"
      primaryButtonText="Remove"
      secondaryButtonColor="secondary"
    />
  );
};

export default RemoveRoutineDialog;

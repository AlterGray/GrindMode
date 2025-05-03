import ConfirmDialog from "../ConfirmDialog";

type RoutineConfirmDialogProps = {
  isOpen?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const RoutineConfirmDialog: React.FC<RoutineConfirmDialogProps> = ({
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

export default RoutineConfirmDialog;

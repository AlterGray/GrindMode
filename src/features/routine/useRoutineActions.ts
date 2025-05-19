import { ActionType } from "@shared/ui/ActionsModal/actionModalTypes";
import { useRoutineStore } from "./routineStore";
import useConfirmDialogStore from "@shared/ui/ConfirmDialog/ConfirmDialogStore";
import { useActionModalStore } from "@shared/ui/ActionsModal/actionsModalStore";

// TODO bad custom hook
const useRoutineActions = (
  routineIds: string[],
  resetSelection: () => void,
  onCancel: () => void,
) => {
  const removeRoutines = useRoutineStore((state) => state.removeRoutines);
  const completeRoutines = useRoutineStore((state) => state.completeRoutines);
  const closeActionModal = useActionModalStore((state) => state.closeModal);
  const closeConfirmModal = useConfirmDialogStore(
    (state) => state.closeConfirmModal,
  );
  const setConfirmDialog = useConfirmDialogStore(
    (state) => state.setConfirmDialog,
  );

  const onConfirm = () => {
    removeRoutines(routineIds);
    closeActionModal();
    closeConfirmModal();
    resetSelection();
  };

  // TODO bug
  const removeAction: ActionType = {
    onPress: () =>
      setConfirmDialog({
        isOpen: true,
        title: "Remove routine",
        message: "Are you sure you want to remove this routine?",
        primaryColor: "danger",
        primaryButtonText: "Remove",
        secondaryColor: "secondary",
        onConfirm: onConfirm,
        onCancel: onCancel,
      }),
    iconName: "trash-outline",
  };

  const completeAction: ActionType = {
    onPress: () => {
      completeRoutines(routineIds);
      resetSelection();
      closeActionModal();
    },
    iconName: "checkmark",
  };

  return { removeAction, completeAction };
};

export default useRoutineActions;

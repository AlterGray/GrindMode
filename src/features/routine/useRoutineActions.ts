import { ActionType } from "@shared/ui/ActionsModal/actionModalTypes";
import { useRoutineStore } from "./routineStore";
import useConfirmDialogStore from "@shared/ui/ConfirmDialog/ConfirmDialogStore";
import { useActionModalStore } from "@shared/ui/ActionsModal/actionsModalStore";
import { ConfirmDialogVariant } from "@shared/ui/ConfirmDialog/types";

// TODO bad custom hook
const useRoutineActions = (
  resetSelection: () => void,
  onCancel: () => void,
) => {
  const removeRoutines = useRoutineStore((state) => state.removeRoutines);
  const completeRoutines = useRoutineStore((state) => state.completeRoutines);
  const closeActionModal = useActionModalStore(
    (state) => state.closeActionModal,
  );
  const closeConfirmModal = useConfirmDialogStore(
    (state) => state.closeConfirmDialog,
  );
  const openConfirmDialog = useConfirmDialogStore(
    (state) => state.openConfirmDialog,
  );

  const onConfirm = (routineIds: string[]) => {
    removeRoutines(routineIds);
    closeActionModal();
    closeConfirmModal();
    resetSelection();
  };

  const getRemoveAction = (routineIds: string[]): ActionType => ({
    onPress: () =>
      openConfirmDialog({
        title: "Remove routine",
        message: "Are you sure you want to remove this routine?",
        variant: ConfirmDialogVariant.Remove,
        onConfirm: () => onConfirm(routineIds),
        onCancel: onCancel,
      }),
    iconName: "trash-outline",
  });

  const getCompleteAction = (routineIds: string[]): ActionType => ({
    onPress: () => {
      completeRoutines(routineIds);
      resetSelection();
      closeActionModal();
    },
    iconName: "checkmark",
  });

  return { getRemoveAction, getCompleteAction };
};

export default useRoutineActions;

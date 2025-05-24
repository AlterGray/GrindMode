import { ActionType } from "@shared/ui/ActionsModal/actionModalTypes";
import { useRoutineStore } from "./routineStore";
import useConfirmModalStore from "@shared/ui/ConfirmModal/ConfirmModalStore";
import { useActionModalStore } from "@shared/ui/ActionsModal/actionsModalStore";
import { ConfirmModalVariant } from "@shared/ui/ConfirmModal/types";

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
  const closeConfirmModal = useConfirmModalStore(
    (state) => state.closeConfirmModal,
  );
  const openConfirmDialog = useConfirmModalStore(
    (state) => state.openConfirmModal,
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
        variant: ConfirmModalVariant.Remove,
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

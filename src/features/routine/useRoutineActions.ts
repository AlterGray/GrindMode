import { FloatingModalVariant } from "@shared/types/commonTypes";
import { ActionType } from "@shared/ui/ActionsModal/actionModalTypes";
import { useActionModalStore } from "@shared/ui/ActionsModal/actionsModalStore";
import { useGlobalFloatingModalStore } from "@shared/ui/GlobalFloatingModal/GlobalFloatingModalStore";

import { useRoutineStore } from "./routineStore";

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
  const closeConfirmModal = useGlobalFloatingModalStore(
    (state) => state.closeModal,
  );
  const openRemoveDialog = useGlobalFloatingModalStore(
    (state) => state.openModal,
  );

  const handleRemoveConfirm = (routineIds: string[]) => {
    removeRoutines(routineIds);
    closeActionModal();
    closeConfirmModal();
    resetSelection();
  };

  const getRemoveAction = (routineIds: string[]): ActionType => ({
    onPress: () =>
      openRemoveDialog({
        title: "Remove routine",
        text: "Are you sure you want to remove this routine?",
        variant: FloatingModalVariant.Danger,
        onConfirm: () => handleRemoveConfirm(routineIds),
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

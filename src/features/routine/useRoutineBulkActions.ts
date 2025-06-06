import { FloatingModalVariant } from "@shared/types/commonTypes";
import { ActionType } from "@shared/ui/ActionsModal/actionModalTypes";
import { useActionModalStore } from "@shared/ui/ActionsModal/actionsModalStore";
import { useGlobalFloatingModalStore } from "@shared/ui/GlobalFloatingModal/GlobalFloatingModalStore";

import { completeRoutine, removeRoutine } from "./lib/routineActions";
import { useRoutineStore } from "./routineStore";

// TODO bad custom hook
const useRoutineBulkActions = (
  resetSelection: () => void,
  onCancel: () => void,
) => {
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
    routineIds.forEach(removeRoutine);

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
      const rotuines = useRoutineStore
        .getState()
        .routines.filter((r) => routineIds.includes(r.id));

      rotuines.forEach(completeRoutine);

      resetSelection();
      closeActionModal();
    },
    iconName: "checkmark",
  });

  return { getRemoveAction, getCompleteAction };
};

export default useRoutineBulkActions;

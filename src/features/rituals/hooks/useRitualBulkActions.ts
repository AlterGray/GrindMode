import { FloatingModalVariant } from "@shared/types/commonTypes";
import { ActionType } from "@shared/ui/ActionsModal/actionModalTypes";
import { useActionModalStore } from "@shared/ui/ActionsModal/actionsModalStore";
import { useGlobalFloatingModalStore } from "@shared/ui/GlobalFloatingModal/GlobalFloatingModalStore";

import { completeRitual, removeRitual } from "../lib/ritualActions";
import { useRitualStore } from "../ritualStore";

// TODO bad custom hook
const useRitualBulkActions = (
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

  const handleRemoveConfirm = (ritualIds: string[]) => {
    ritualIds.forEach(removeRitual);

    closeActionModal();
    closeConfirmModal();
    resetSelection();
  };

  const getRemoveAction = (ritualIds: string[]): ActionType => ({
    onPress: () =>
      openRemoveDialog({
        title: "Remove rituals",
        text: "Are you sure you want to remove this rituals?",
        variant: FloatingModalVariant.Danger,
        onConfirm: () => handleRemoveConfirm(ritualIds),
        onCancel: onCancel,
      }),
    iconName: "trash-outline",
  });

  const getCompleteAction = (ritualIds: string[]): ActionType => ({
    onPress: () => {
      const rituals = useRitualStore
        .getState()
        .rituals.filter((r) => ritualIds.includes(r.id));

      rituals.forEach(completeRitual);

      resetSelection();
      closeActionModal();
    },
    iconName: "checkmark",
  });

  return { getRemoveAction, getCompleteAction };
};

export default useRitualBulkActions;

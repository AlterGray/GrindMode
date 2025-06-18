import { ActionType } from "@shared/ui/ActionsModal/actionModalTypes";
import { useActionModalStore } from "@shared/ui/ActionsModal/actionsModalStore";

import { completeRitual } from "../lib/ritualActions";
import { useRitualStore } from "../ritualStore";

// TODO bad custom hook
const useRitualBulkActions = (
  openRemoveDialog: () => void,
  resetSelection: () => void,
) => {
  const closeActionModal = useActionModalStore(
    (state) => state.closeActionModal,
  );

  const getRemoveAction = (): ActionType => ({
    onPress: openRemoveDialog,
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

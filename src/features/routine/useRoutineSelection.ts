import { useState } from "react";

import { useRoutinePopoverActions } from "@features/folder/useRoutinePopoverActions";

import { useActionModalStore } from "@shared/ui/ActionsModal/actionsModalStore";

import { useRoutineStore } from "./routineStore";
import useRoutineBulkActions from "./useRoutineBulkActions";

// TODO
export const useRoutineSelection = (
  onOpenNavModal: () => void,
  onCloseDialogs: () => void,
) => {
  const openActionModal = useActionModalStore((state) => state.openActionModal);
  const closeActionModal = useActionModalStore(
    (state) => state.closeActionModal,
  );
  // TODO use selectors?
  const selectedRoutineIds = useRoutineStore((state) => state.selectedIds);
  const setSelectedRoutineIds = useRoutineStore(
    (state) => state.setSelectedIds,
  );
  const setIsSelecting = useRoutineStore((state) => state.setIsSelecting);

  type MenuAction = "add" | "move";
  const [currentMenuAction, setCurrentMenuAction] = useState<MenuAction>("add");

  const resetSelection = () => {
    setSelectedRoutineIds([]);
    setIsSelecting(false);
  };

  const { getCompleteAction, getRemoveAction } = useRoutineBulkActions(
    resetSelection,
    () => {
      onCloseDialogs();
      resetSelection();
    },
  );

  const removeRoutinesFromFolder = useRoutineStore(
    (state) => state.removeRoutinesFromFolder,
  );
  const addRoutinesToFolder = useRoutineStore(
    (state) => state.addRoutinesToFolder,
  );

  const { menuActions: routinePopoverMenuActions } = useRoutinePopoverActions(
    onCloseDialogs,
    onOpenNavModal,
    (action: MenuAction) => setCurrentMenuAction(action),
    removeRoutinesFromFolder,
    addRoutinesToFolder,
  );
  const updateActionModal = (selectedItems: string[]) => {
    const count = selectedItems.length;

    if (count > 0) {
      openActionModal({
        text: `${count} item${count === 1 ? "" : "s"} selected`,
        isMenuAction: true,
        menuActions: routinePopoverMenuActions,
        actions: [
          getRemoveAction(selectedItems),
          getCompleteAction(selectedItems),
        ],
        onCloseDialog: resetSelection,
      });
    } else closeActionModal();
  };
  const toggleRoutine = (id: string) => {
    const isAlreadySelected = selectedRoutineIds.includes(id);
    const updatedRoutines = isAlreadySelected
      ? selectedRoutineIds.filter((itemId) => itemId !== id)
      : [...selectedRoutineIds, id];

    setSelectedRoutineIds(updatedRoutines);
    setIsSelecting(updatedRoutines.length > 0);
    updateActionModal(updatedRoutines);
  };

  return {
    toggleRoutine,
    resetSelection,
    currentMenuAction,
  };
};

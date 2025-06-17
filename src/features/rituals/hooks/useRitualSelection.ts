import { useState } from "react";

import { useRitualPopoverActions } from "@features/folder/useRitualPopoverActions";

import { useActionModalStore } from "@shared/ui/ActionsModal/actionsModalStore";

import { useRitualStore } from "../ritualStore";
import useRitualBulkActions from "./useRitualBulkActions";

// TODO
export const useRitualSelection = (
  onOpenNavModal: () => void,
  onCloseDialogs: () => void,
) => {
  const openActionModal = useActionModalStore((state) => state.openActionModal);
  const closeActionModal = useActionModalStore(
    (state) => state.closeActionModal,
  );
  // TODO use selectors?
  const selectedRitualIds = useRitualStore((state) => state.selectedIds);
  const setSelectedRitualIds = useRitualStore((state) => state.setSelectedIds);
  const setIsSelecting = useRitualStore((state) => state.setIsSelecting);

  type MenuAction = "add" | "move";
  const [currentMenuAction, setCurrentMenuAction] = useState<MenuAction>("add");

  const resetSelection = () => {
    setSelectedRitualIds([]);
    setIsSelecting(false);
  };

  const { getCompleteAction, getRemoveAction } = useRitualBulkActions(
    resetSelection,
    () => {
      onCloseDialogs();
      resetSelection();
    },
  );

  const removeRitualsFromFolder = useRitualStore(
    (state) => state.removeRitualsFromFolder,
  );
  const addRitualsToFolder = useRitualStore(
    (state) => state.addRitualsToFolder,
  );

  const { menuActions: ritualPopoverMenuActions } = useRitualPopoverActions(
    onCloseDialogs,
    onOpenNavModal,
    (action: MenuAction) => setCurrentMenuAction(action),
    removeRitualsFromFolder,
    addRitualsToFolder,
  );
  const updateActionModal = (selectedItems: string[]) => {
    const count = selectedItems.length;

    if (count > 0) {
      openActionModal({
        text: `${count} item${count === 1 ? "" : "s"} selected`,
        isMenuAction: true,
        menuActions: ritualPopoverMenuActions,
        actions: [
          getRemoveAction(selectedItems),
          getCompleteAction(selectedItems),
        ],
        onCloseDialog: resetSelection,
      });
    } else closeActionModal();
  };
  const toggleRitual = (id: string) => {
    const isAlreadySelected = selectedRitualIds.includes(id);
    const updatedRituals = isAlreadySelected
      ? selectedRitualIds.filter((itemId) => itemId !== id)
      : [...selectedRitualIds, id];

    setSelectedRitualIds(updatedRituals);
    setIsSelecting(updatedRituals.length > 0);
    updateActionModal(updatedRituals);
  };

  return {
    toggleRitual,
    resetSelection,
    currentMenuAction,
  };
};

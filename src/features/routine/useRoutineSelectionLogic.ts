import { useState } from "react";
import { useActionModalStore } from "@shared/ui/ActionsModal/actionsModalStore";
import useRoutineActions from "./useRoutineActions";
import getFolderActions from "@features/folder/getFolderActions";
import { useRoutineStore } from "./routineStore";

export const useRoutineSelectionLogic = (
  folderId: string,
  onOpenNavModal: () => void,
  onCloseDialogs: () => void,
) => {
  const setActionModal = useActionModalStore((state) => state.setActionModal);

  const [selectedRoutines, setSelectedRoutines] = useState<string[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);

  type MenuAction = "add" | "move";
  const [currentMenuAction, setCurrentMenuAction] = useState<MenuAction>("add");

  const resetSelection = () => {
    setSelectedRoutines([]);
    setIsSelecting(false);
  };

  const { getCompleteAction, getRemoveAction } = useRoutineActions(
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
  const updateActionModal = (selectedItems: string[]) => {
    const { menuActions } = getFolderActions(
      selectedItems,
      folderId,
      onCloseDialogs,
      onOpenNavModal,
      (action: MenuAction) => setCurrentMenuAction(action),
      removeRoutinesFromFolder,
      addRoutinesToFolder,
    );
    const count = selectedItems.length;
    setActionModal({
      isOpen: count > 0,
      text: `${count} item${count === 1 ? "" : "s"} selected`,
      isMenuAction: true,
      menuActions: menuActions,
      actions: [
        getRemoveAction(selectedItems),
        getCompleteAction(selectedItems),
      ],
      onCloseDialog: resetSelection,
    });
  };

  const toggleRoutine = (id: string) => {
    const isAlreadySelected = selectedRoutines.includes(id);
    const updatedRoutines = isAlreadySelected
      ? selectedRoutines.filter((itemId) => itemId !== id)
      : [...selectedRoutines, id];

    setSelectedRoutines(updatedRoutines);
    setIsSelecting(updatedRoutines.length > 0);
    updateActionModal(updatedRoutines);
  };

  return {
    selectedRoutines,
    isSelecting,
    toggleRoutine,
    resetSelection,
    currentMenuAction,
  };
};

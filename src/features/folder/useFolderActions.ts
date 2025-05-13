import { useRoutineStore } from "@features/routine/routineStore";
import React, { useState } from "react";

const useFolderActions = (
  routineIds: string[],
  folderId: string,
  onClose: () => void,
  onPress: () => void,
) => {
  type MenuAction = "add" | "move";
  const [currentMenuAction, setCurrentMenuAction] = useState<MenuAction>("add");

  const removeRoutinesFromFolder = useRoutineStore(
    (state) => state.removeRoutinesFromFolder,
  );
  const addRoutinesToFolder = useRoutineStore(
    (state) => state.addRoutinesToFolder,
  );

  const handleRemoveRoutinesFromFolder = (
    selectedItems: string[],
    folderId: string,
  ) => {
    removeRoutinesFromFolder(selectedItems, folderId);
    onClose();
  };

  // TODO open modal with confirmation
  const removeFromFolderAction = {
    label: "Remove from folder",
    onPress: () => handleRemoveRoutinesFromFolder(routineIds, folderId),
  };
  const addToFolderAction = {
    label: "Add to folder",
    onPress: () => {
      setCurrentMenuAction("add");
      onPress();
    },
  };
  const moveToFolderAction = {
    label: "Move to folder",
    onPress: () => {
      setCurrentMenuAction("move");
      onPress();
    },
  };

  // TODO name is too long
  const handleAddRoutinesToFolder = (folderId: string) => {
    addRoutinesToFolder(routineIds, folderId);
    onClose();
  };

  // TOOD FIX IT, IF WE DON'T USE MEMO THEN APP CRASHES, REALLY CONFUSING WHEN FORGETTING ABOUT IT
  const menuActions = React.useMemo(() => {
    const actions = [addToFolderAction];

    if (folderId !== "-1") {
      actions.push(removeFromFolderAction);
      actions.push(moveToFolderAction);
    }

    return actions;
  }, [routineIds.length, folderId]);

  return {
    currentMenuAction,
    menuActions,
    handleAddRoutinesToFolder,
    handleRemoveRoutinesFromFolder,
  };
};

export default useFolderActions;

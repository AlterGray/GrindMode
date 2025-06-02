import { useRoutineStore } from "@features/routine/routineStore";

import { DEFAULT_FOLDER } from "@shared/constants/Folders";

import { useFolderStore } from "./folderStore";

export const useRoutinePopoverActions = (
  onClose: () => void,
  onPress: () => void,
  setCurrentMenuAction: (action: any) => void,
  removeRoutinesFromFolder: (routineIds: string[], folderId: string) => void,
  addRoutinesToFolder: (routineIds: string[], folderId: string) => void,
) => {
  const selectedRoutineIds = useRoutineStore((state) => state.selectedIds);
  const selectedFolderId = useFolderStore((state) => state.selectedId);
  const handleRemoveRoutinesFromFolder = (folderId: string) => {
    removeRoutinesFromFolder(selectedRoutineIds, folderId);
    onClose();
  };

  // TODO open modal with confirmation
  const removeFromFolderAction = {
    label: "Remove from folder",
    onPress: () => handleRemoveRoutinesFromFolder(selectedFolderId),
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
    addRoutinesToFolder(selectedRoutineIds, folderId);
    onClose();
  };

  // TOOD FIX IT, IF WE DON'T USE MEMO THEN APP CRASHES, REALLY CONFUSING WHEN FORGETTING ABOUT IT
  const getMenuActions = () => {
    const actions = [addToFolderAction];

    if (selectedFolderId !== DEFAULT_FOLDER) {
      actions.push(moveToFolderAction);
      // TODO can remove this?
      actions.push(removeFromFolderAction);
    }

    return actions;
  };

  return {
    menuActions: getMenuActions(),
    handleAddRoutinesToFolder,
    handleRemoveRoutinesFromFolder,
  };
};

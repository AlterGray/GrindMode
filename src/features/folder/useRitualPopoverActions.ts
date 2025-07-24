import { useRitualStore } from "@features/rituals/ritualStore";

import { ALL_FOLDER_ID, TODAY_FOLDER_ID } from "@shared/constants/Folders";

import { useFolderStore } from "./folderStore";

export const useRitualPopoverActions = (
  onClose: () => void,
  onPress: () => void,
  setCurrentMenuAction: (action: any) => void,
  removeRitualsFromFolder: (ritualIds: string[], folderId: string) => void,
  addRitualsToFolder: (ritualIds: string[], folderId: string) => void,
) => {
  const selectedRitualIds = useRitualStore((state) => state.selectedIds);
  const selectedFolderId = useFolderStore((state) => state.selectedId);
  const handleRemoveRitualsFromFolder = (folderId: string) => {
    removeRitualsFromFolder(selectedRitualIds, folderId);
    onClose();
  };

  // TODO open modal with confirmation
  const removeFromFolderAction = {
    label: "Remove from folder",
    onPress: () => handleRemoveRitualsFromFolder(selectedFolderId),
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
  const handleAddRitualsToFolder = (folderId: string) => {
    addRitualsToFolder(selectedRitualIds, folderId);
    onClose();
  };

  // TOOD FIX IT, IF WE DON'T USE MEMO THEN APP CRASHES, REALLY CONFUSING WHEN FORGETTING ABOUT IT
  const getMenuActions = () => {
    const actions = [addToFolderAction];

    if (
      selectedFolderId !== ALL_FOLDER_ID &&
      selectedFolderId !== TODAY_FOLDER_ID
    ) {
      actions.push(moveToFolderAction);
      // TODO can remove this?
      actions.push(removeFromFolderAction);
    }

    return actions;
  };

  return {
    menuActions: getMenuActions(),
    handleAddRitualsToFolder,
    handleRemoveRitualsFromFolder,
  };
};

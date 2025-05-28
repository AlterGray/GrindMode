import { DEFAULT_FOLDER } from "@shared/constants/Folders";

const getFolderActions = (
  routineIds: string[],
  folderId: string,
  onClose: () => void,
  onPress: () => void,
  setCurrentMenuAction: (action: any) => void,
  removeRoutinesFromFolder: (items: string[], folderId: string) => void,
  addRoutinesToFolder: (routineIds: string[], folderId: string) => void,
) => {
  const handleRemoveRoutinesFromFolder = (
    selectedItems: string[],
    folderId: string,
  ) => {
    removeRoutinesFromFolder(selectedItems, folderId);
    onClose();
  };

  // TODO open modal with confirmation
  const removeFromFolderAction = (ids: string[]) => ({
    label: "Remove from folder",
    onPress: () => handleRemoveRoutinesFromFolder(ids, folderId),
  });
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
  const getMenuActions = () => {
    const actions = [addToFolderAction];

    if (folderId !== DEFAULT_FOLDER) {
      actions.push(moveToFolderAction);
      actions.push(removeFromFolderAction(routineIds));
    }

    return actions;
  };

  return {
    menuActions: getMenuActions(),
    handleAddRoutinesToFolder,
    handleRemoveRoutinesFromFolder,
  };
};

export default getFolderActions;

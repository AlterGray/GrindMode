import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { useFolderStore } from "@features/folder/folderStore";
import { FolderColorType } from "@features/folder/types";
import useFolderActions from "@features/folder/useFolderActions";
import { useFolderColor } from "@features/folder/useFolderColor";

import { ROUTES } from "@shared/constants/routes";

import { useRoutineStore } from "./routineStore";

const useFolderNavModal = (
  closeDialogs: () => void,
  currentMenuAction: any,
) => {
  const router = useRouter();
  const selectedRoutineIds = useRoutineStore((state) => state.selectedIds);
  const selectedFolderId = useFolderStore((state) => state.selectedId);
  // TODO move to utils?
  const routines = useRoutineStore((state) => state.routines)
    .filter((r) => selectedRoutineIds.includes(r.id))
    .filter((r) => r.folderIds.includes(selectedFolderId));
  const folders = useFolderStore((state) => state.folders);

  const removeRoutinesFromFolder = useRoutineStore(
    (state) => state.removeRoutinesFromFolder,
  );
  const addRoutinesToFolder = useRoutineStore(
    (state) => state.addRoutinesToFolder,
  );
  const getFolderColor = useFolderColor();

  const { handleAddRoutinesToFolder, handleRemoveRoutinesFromFolder } =
    useFolderActions(
      closeDialogs,
      () => {},
      currentMenuAction,
      removeRoutinesFromFolder,
      addRoutinesToFolder,
    );
  const navModalAction = (sfolderId: string) => {
    if (currentMenuAction === "add") {
      handleAddRoutinesToFolder(sfolderId);
    } else if (currentMenuAction === "move") {
      handleRemoveRoutinesFromFolder(selectedFolderId);
      handleAddRoutinesToFolder(sfolderId);
    }
    closeDialogs();
  };

  // TODO
  const color = (name: FolderColorType) => getFolderColor(name);
  const navModalActions = folders
    .map((folder) => ({
      title: folder.name,
      onPress: () => navModalAction(folder.id),
      // TODO extract to constants?
      iconName: "folder-outline" as keyof typeof Ionicons.glyphMap,
      iconColor: color(folder.color as FolderColorType),
      isMarked: routines.some((r) => r.folderIds.includes(folder.id)),
    }))
    .filter((f) => f.title !== "All routines");

  // TODO move it to nav modal?
  navModalActions.push({
    iconName: "add",
    title: "Create new folder",
    onPress: () => {
      closeDialogs();
      router.push(ROUTES.FOLDERS_CREATE);
    },
    isMarked: false,
    iconColor: color("default"),
  });

  return navModalActions;
};

export default useFolderNavModal;

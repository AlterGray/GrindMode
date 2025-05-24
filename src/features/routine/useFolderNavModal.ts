import { Ionicons } from "@expo/vector-icons";
import { useFolderStore } from "@features/folder/folderStore";
import { FolderColorType } from "@features/folder/types";
import useFolderActions from "@features/folder/getFolderActions";
import { useFolderColor } from "@features/folder/useFolderColor";
import { useRouter } from "expo-router";
import { useRoutineStore } from "./routineStore";

const useFolderNavModal = (
  routineIds: string[],
  folderId: string,
  closeDialogs: () => void,
  currentMenuAction: any,
) => {
  const router = useRouter();
  const routines = useRoutineStore((state) => state.routines)
    .filter((r) => routineIds.includes(r.id))
    .filter((r) => r.folderIds.includes(folderId));
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
      routineIds,
      folderId,
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
      handleRemoveRoutinesFromFolder(
        // TODO add util method?
        routineIds,
        folderId,
      );
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
      // TODO hardcoded
      router.push("/folders/create");
    },
    isMarked: false,
    iconColor: color("default"),
  });

  return navModalActions;
};

export default useFolderNavModal;

import { useRouter } from "expo-router";

import { useFolderStore } from "@features/folder/folderStore";
import { FolderColorType } from "@features/folder/types";
import { useFolderColor } from "@features/folder/useFolderColor";
import { useRitualPopoverActions } from "@features/folder/useRitualPopoverActions";

import { ROUTES } from "@shared/constants/routes";
import { IoniconsName } from "@shared/types/commonTypes";

import { useRitualStore } from "../ritualStore";

const useFolderNavModal = (
  closeDialogs: () => void,
  currentMenuAction: any,
) => {
  const router = useRouter();
  const selectedRitualIds = useRitualStore((state) => state.selectedIds);
  const selectedFolderId = useFolderStore((state) => state.selectedId);
  // TODO move to utils?
  const rituals = useRitualStore((state) => state.rituals)
    .filter((r) => selectedRitualIds.includes(r.id))
    .filter((r) => r.folderIds.includes(selectedFolderId));
  const folders = useFolderStore((state) => state.folders);

  const removeRitualsFromFolder = useRitualStore(
    (state) => state.removeRitualsFromFolder,
  );
  const addRitualsToFolder = useRitualStore(
    (state) => state.addRitualsToFolder,
  );
  const getFolderColor = useFolderColor();

  const { handleAddRitualsToFolder, handleRemoveRitualsFromFolder } =
    useRitualPopoverActions(
      closeDialogs,
      () => {},
      currentMenuAction,
      removeRitualsFromFolder,
      addRitualsToFolder,
    );
  const navModalAction = (sfolderId: string) => {
    if (currentMenuAction === "add") {
      handleAddRitualsToFolder(sfolderId);
    } else if (currentMenuAction === "move") {
      handleRemoveRitualsFromFolder(selectedFolderId);
      handleAddRitualsToFolder(sfolderId);
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
      iconName: "folder-outline" as IoniconsName,
      iconColor: color(folder.color as FolderColorType),
      isMarked: rituals.some((r) => r.folderIds.includes(folder.id)),
    }))
    .filter((f) => f.title !== "All rituals");

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

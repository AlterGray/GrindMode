import StyledList from "@shared/ui/StyledList/StyledList";
import ThemedView from "@shared/ui/ThemedView";
import TouchBlocker from "@shared/ui/TouchBlocker";
import RoutineListItem from "./RoutineListItem";
import { Routine } from "./routineTypes";
import { useEffect, useState } from "react";
import { useRoutineStore } from "./routineStore";
import { useSelectableItems } from "@shared/hooks/useSelectableItems";
import { useActionModalStore } from "@shared/ui/ActionsModal/actionsModalStore";
import { usePathname, useRouter } from "expo-router";
import React from "react";
import NavModal from "@shared/ui/NavModal/NavModal";
import { useFolderStore } from "@features/folder/folderStore";
import { Ionicons } from "@expo/vector-icons";
import { FolderColorType } from "@features/folder/types";
import { getFolderColor } from "@features/folder/utils";
import useRoutineActions from "./useRoutineActions";
import useFolderActions from "@features/folder/useFolderActions";
import CreateButton from "@shared/ui/CreateButton";
import useConfirmDialogStore from "@shared/ui/ConfirmDialog/ConfirmDialogStore";

type RoutineListProps = {
  folderId: string;
  setIsReordering: (isReordering: boolean) => void;
};
const router = useRouter();

// TODO refactor it
const RoutineList: React.FC<RoutineListProps> = ({ folderId }) => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isNavModalOpened, setIsNavModalOpened] = useState(false);
  const openNavModal = () => setIsNavModalOpened(true);
  const closeConfirmDialog = useConfirmDialogStore(
    (state) => state.closeConfirmDialog,
  );

  const pathName = usePathname();
  const setActionModal = useActionModalStore((state) => state.setActionModal);
  const folders = useFolderStore((state) => state.folders);

  const closeActionModal = useActionModalStore((state) => state.closeModal);

  const options: { label: string; value: string }[] = [
    { label: "Folder", value: "folder" },
    { label: "Routine", value: "routine" },
  ];

  const routines = useRoutineStore((state) => state.routines);

  const {
    isSelecting,
    resetSelection,
    selectedItems: selectedRoutines,
    selectedItemsRef,
    startSelecting,
    toggleItem,
  } = useSelectableItems(closeActionModal);

  const closeDialogs = () => {
    setIsNavModalOpened(false);
    closeActionModal();
  };

  const { removeAction, completeAction } = useRoutineActions(
    selectedRoutines,
    resetSelection,
    closeConfirmDialog,
  );
  const {
    currentMenuAction,
    menuActions,
    handleAddRoutinesToFolder,
    handleRemoveRoutinesFromFolder,
  } = useFolderActions(selectedRoutines, folderId, closeDialogs, openNavModal);

  const redirectToUpdate = (id: string) => {
    setIsRedirecting(true);
    router.push({ pathname: "/routines/update/[id]", params: { id } });
  };

  const routes = {
    folder: "/folders/create" as const,
    routine: "/routines/create" as const,
  };

  // TODO refactore it
  useEffect(() => {
    selectedItemsRef.current = selectedRoutines;
  }, [selectedRoutines]);

  // TODO bug
  useEffect(() => {
    if (pathName === "/") {
      // TODO
      setIsRedirecting(false);
    }
  }, [pathName]);

  const navModalAction = (sfolderId: string) => {
    if (currentMenuAction === "add") {
      handleAddRoutinesToFolder(sfolderId);
    } else if (currentMenuAction === "move") {
      handleRemoveRoutinesFromFolder(selectedRoutines, folderId);
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
      router.push(routes.folder);
    },
    isMarked: false,
    iconColor: color("default"),
  });

  return (
    <ThemedView className="flex-1 items-center justify-center">
      <TouchBlocker>
        {/* TODO does it ok? */}
        <StyledList
          selectedIds={selectedRoutines}
          startSelectingItems={(id) => {
            startSelecting(id);
            setActionModal(
              true,
              `1 items selected`,
              [removeAction, completeAction],
              true,
              menuActions,
              resetSelection,
            );
          }}
          isSelectingItems={isSelecting}
          onItemSelect={(id) => {
            setActionModal(
              true,
              `${selectedItemsRef.current.length} items selected`,
            );
            toggleItem(id);
          }}
          onPress={redirectToUpdate}
          data={routines.filter((r) => r.folderIds.includes(folderId))}
          renderContent={(item) => <RoutineListItem item={item as Routine} />}
        />
      </TouchBlocker>

      <CreateButton options={options} routes={routes} />
      <NavModal
        isVisible={isNavModalOpened}
        onClose={() => setIsNavModalOpened(false)}
        title="Select folder"
        actions={navModalActions}
      />
    </ThemedView>
  );
};

export default RoutineList;

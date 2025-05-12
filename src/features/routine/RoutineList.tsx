import StyledList from "@shared/ui/StyledList/StyledList";
import ThemedView from "@shared/ui/ThemedView";
import TouchBlocker from "@shared/ui/TouchBlocker";
import RoutineListItem from "./RoutineListItem";
import { Routine } from "./routineTypes";
import CreateButton from "@shared/ui/CreateButton";
import { useEffect, useState } from "react";
import { useRoutineStore } from "./routineStore";
import { ActionType } from "@shared/ui/ActionsModal/actionModalTypes";
import { useSelectableItems } from "@shared/hooks/useSelectableItems";
import { useActionModalStore } from "@shared/ui/ActionsModal/actionsModalStore";
import { usePathname, useRouter } from "expo-router";
import ToggleOptions from "@shared/ui/ToggleOptions/ToggleOptions";
import React from "react";
import NavModal from "@shared/ui/NavModal/NavModal";
import { useFolderStore } from "@features/folder/folderStore";
import { Ionicons } from "@expo/vector-icons";
import useConfirmDialogStore from "@shared/ui/ConfirmDialog/ConfirmDialogStore";
import ThemedText from "@shared/ui/ThemedText";

type RoutineListProps = {
  folderId: string;
  setIsReordering: (isReordering: boolean) => void;
};

// TODO refactor it
const RoutineList: React.FC<RoutineListProps> = ({ folderId }) => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();
  const pathName = usePathname();
  const [isNavModalOpened, setIsNavModalOpened] = useState(false);
  const setActionModal = useActionModalStore((state) => state.setActionModal);
  const closeModal = useActionModalStore((state) => state.closeModal);
  const folders = useFolderStore((state) => state.folders);
  const setConfirmDialog = useConfirmDialogStore(
    (state) => state.setConfirmDialog,
  );
  const closeConfirmModal = useConfirmDialogStore(
    (state) => state.closeConfirmModal,
  );

  type Option = "folder" | "routine";
  const options: { label: string; value: Option }[] = [
    { label: "Folder", value: "folder" },
    { label: "Routine", value: "routine" },
  ];
  const [option, setOption] = useState(options[0].value);

  const routines = useRoutineStore((state) => state.routines);
  const completeRoutines = useRoutineStore((state) => state.completeRoutines);
  const addRoutinesToFolder = useRoutineStore(
    (state) => state.addRoutinesToFolder,
  );
  const removeRoutinesFromFolder = useRoutineStore(
    (state) => state.removeRoutinesFromFolder,
  );
  type MenuAction = "add" | "move";
  const [currentMenuAction, setCurrentMenuAction] = useState<MenuAction>("add");

  const {
    isSelecting,
    resetSelection,
    selectedItems: selectedRoutines,
    selectedItemsRef,
    startSelecting,
    toggleItem,
  } = useSelectableItems(closeModal);

  const redirectToUpdate = (id: string) => {
    setIsRedirecting(true);
    router.push({ pathname: "/routines/update/[id]", params: { id } });
  };

  const routes = {
    folder: "/folders/create" as const,
    routine: "/routines/create" as const,
  };

  const removeAction: ActionType = {
    onPress: () => {
      setConfirmDialog({
        isOpen: true,
        title: "Remove routine",
        message: (
          <ThemedText>Are you sure you want to remove this routine?</ThemedText>
        ),
        primaryColor: "danger",
        primaryButtonText: "Remove",
        secondaryColor: "secondary",
        onConfirm: () => {
          removeRoutines(selectedRoutines);
          closeConfirmModal();
        },
        onCancel: () => closeConfirmModal(),
      });
    },
    iconName: "trash-outline",
  };
  const completeAction: ActionType = {
    onPress: () => {
      completeRoutines(selectedItemsRef.current);
      resetSelection();
      closeModal();
    },
    iconName: "checkmark",
  };

  // TODO move logic to component

  const removeRoutines = useRoutineStore((state) => state.removeRoutines);
  const onConfirm = () => {
    removeRoutines(selectedRoutines);
    closeModal();
    closeConfirmModal();
    resetSelection();
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

  // TODO open modal with confirmation
  const removeFromFolderAction = {
    label: "Remove from folder",
    onPress: () => handleRemoveRoutinesFromFolder(selectedRoutines, folderId),
  };
  const addToFolderAction = {
    label: "Add to folder",
    onPress: () => {
      setCurrentMenuAction("add");
      setIsNavModalOpened(true);
    },
  };
  const moveToFolderAction = {
    label: "Move to folder",
    onPress: () => {
      setCurrentMenuAction("move");
      setIsNavModalOpened(true);
    },
  };

  // TOOD FIX IT, IF WE DON'T USE MEMO THEN APP CRASHES, REALLY CONFUSING WHEN FORGETTING ABOUT IT
  const menuActions = React.useMemo(() => {
    const actions = [addToFolderAction];

    if (folderId !== "-1") {
      actions.push(removeFromFolderAction);
      actions.push(moveToFolderAction);
    }

    return actions;
  }, [selectedRoutines.length, folderId]);

  // TODO name is too long
  const handleAddRoutinesToFolder = (folderId: string) => {
    addRoutinesToFolder(selectedRoutines, folderId);
    setIsNavModalOpened(false);
    closeModal();
  };

  const closeDialogs = () => {
    setIsNavModalOpened(false);
    closeModal();
  };

  const handleRemoveRoutinesFromFolder = (
    selectedItems: string[],
    folderId: string,
  ) => {
    removeRoutinesFromFolder(selectedItems, folderId);
    closeDialogs();
  };

  const navModalAction = (sfolderId: string) => {
    if (currentMenuAction === "add") {
      handleAddRoutinesToFolder(sfolderId);
    } else if (currentMenuAction === "move") {
      handleRemoveRoutinesFromFolder(selectedRoutines, folderId);
      handleAddRoutinesToFolder(sfolderId);
    }
    closeDialogs();
  };
  const navModalActions = folders
    .map((folder) => ({
      title: folder.name,
      onPress: () => navModalAction(folder.id),
      iconName: "folder-outline" as keyof typeof Ionicons.glyphMap,
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

      <CreateButton
        onPress={() => {
          setConfirmDialog({
            isOpen: true,
            title: "Select what you want to create",
            message: (
              <ToggleOptions
                options={options}
                onChange={(option) => setOption(option as Option)}
              />
            ),
            primaryButtonText: "Create",
            primaryColor: "primary",
            onConfirm: () => {
              router.push(routes[option]);
              closeConfirmModal();
            },
            onCancel: () => closeConfirmModal(),
          });
        }}
      />
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

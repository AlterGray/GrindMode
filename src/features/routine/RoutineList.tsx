import StyledList from "@shared/ui/StyledList/StyledList";
import ThemedView from "@shared/ui/ThemedView";
import TouchBlocker from "@shared/ui/TouchBlocker";
import RoutineListItem from "./RoutineListItem";
import { Routine } from "./routineTypes";
import CreateButton from "@shared/ui/CreateButton";
import RemoveRoutineDialog from "./RemoveRoutineDialog";
import { useActionModal } from "@shared/ui/ActionsModal/useActionModal";
import { useEffect, useState } from "react";
import { useRoutineStore } from "./routineStore";
import { ActionType } from "@shared/ui/ActionsModal/actionModalTypes";
import { useSelectableItems } from "@shared/hooks/useSelectableItems";
import { useActionModalStore } from "@shared/ui/ActionsModal/actionsModalStore";
import { usePathname, useRouter } from "expo-router";
import ConfirmDialog from "@shared/ui/ConfirmDialog";
import ToggleOptions from "@shared/ui/ToggleOptions/ToggleOptions";
import React from "react";
import NavModal from "@shared/ui/NavModal/NavModal";
import { useFolderStore } from "@features/folder/folderStore";
import { Ionicons } from "@expo/vector-icons";
import FolderListItem from "@features/folder/components/FolderListItem";

type RoutineListProps = {
  folderId: string;
};

// TODO refactor it
const RoutineList: React.FC<RoutineListProps> = ({ folderId }) => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isCreateDialogOpened, setIsCreateDialogOpened] = useState(false);
  const router = useRouter();
  const pathName = usePathname();
  const [isConfirmDialogOpened, setIsConfirmDialogOpened] = useState(false);
  const [isNavModalOpened, setIsNavModalOpened] = useState(false);
  const folders = useFolderStore((state) => state.folders);

  type Option = "folder" | "routine";
  const options: { label: string; value: Option }[] = [
    { label: "Folder", value: "folder" },
    { label: "Routine", value: "routine" },
  ];
  const [option, setOption] = useState(options[0].value);

  const { setIsOpen } = useActionModalStore();
  const routines = useRoutineStore((state) => state.routines);
  const completeRoutines = useRoutineStore((state) => state.completeRoutines);
  const addRoutinesToFolder = useRoutineStore(
    (state) => state.addRoutinesToFolder,
  );
  const removeRoutinesFromFolder = useRoutineStore(
    (state) => state.removeRoutinesFromFolder,
  );
  type MenuAction = "add" | "remove" | "move" | "none";
  const [currentMenuAction, setCurrentMenuAction] =
    useState<MenuAction>("none");

  const {
    isSelecting,
    resetSelection,
    selectedItems,
    selectedItemsRef,
    startSelecting,
    toggleItem,
  } = useSelectableItems();

  const redirectToUpdate = (id: string) => {
    setIsRedirecting(true);
    router.push({ pathname: "/routines/update/[id]", params: { id } });
  };

  const routes = {
    folder: "/folders/create" as const,
    routine: "/routines/create" as const,
  };

  const removeAction: ActionType = {
    onPress: () => setIsConfirmDialogOpened(true),
    iconName: "trash-outline",
  };
  const completeAction: ActionType = {
    onPress: () => {
      completeRoutines(selectedItemsRef.current);
      setIsOpen(false);
      resetSelection();
    },
    iconName: "checkmark",
  };

  // TODO move logic to component

  const removeRoutines = useRoutineStore((state) => state.removeRoutines);
  const onConfirm = () => {
    removeRoutines(selectedItems);
    setIsOpen(false);
    setIsConfirmDialogOpened(false);
    resetSelection();
  };

  // TODO refactore it
  useEffect(() => {
    selectedItemsRef.current = selectedItems;
  }, [selectedItems]);

  // TODO bug
  useEffect(() => {
    if (pathName === "/") {
      // TODO
      setIsRedirecting(false);
    }
  }, [pathName]);

  const removeFromFolderAction = {
    label: "Remove from folder",
    onPress: () => handleRemoveRoutinesFromFolder(folderId),
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

  const menuActions = [addToFolderAction];
  if (folderId !== "-1") {
    menuActions.push(removeFromFolderAction);
    menuActions.push(moveToFolderAction);
  }

  useActionModal({
    actions: [removeAction, completeAction],
    onReset: resetSelection,
    isMenuAction: true,
    menuActions: menuActions,
  });

  // TODO name is too long
  const handleAddRoutinesToFolder = (folderId: string) => {
    addRoutinesToFolder(selectedItems, folderId);
    setIsNavModalOpened(false);
    setIsOpen(false);
  };

  const handleRemoveRoutinesFromFolder = (folderId: string) => {
    removeRoutinesFromFolder(selectedItems, folderId);
    setIsNavModalOpened(false);
    setIsOpen(false);
  };

  const navModalAction = (sfolderId: string) => {
    if (currentMenuAction === "add") {
      handleAddRoutinesToFolder(sfolderId);
    } else if (currentMenuAction === "move") {
      handleRemoveRoutinesFromFolder(folderId);
      handleAddRoutinesToFolder(sfolderId);
    }
    setIsNavModalOpened(false);
    setIsOpen(false);
  };
  const navModalActions = folders
    .map((folder) => ({
      title: folder.name,
      onPress: () => navModalAction(folder.id),
      iconName: "folder-outline" as keyof typeof Ionicons.glyphMap,
    }))
    .filter((f) => f.title !== "All routines");

  // TODO move it to nav modal?
  navModalActions.push({
    iconName: "add",
    title: "Create new folder",
    onPress: () => {
      setIsNavModalOpened(false);
      setIsOpen(false);
      router.push(routes.folder);
    },
  });

  return (
    <ThemedView className="flex-1 items-center justify-center">
      <TouchBlocker>
        {/* TODO does it ok? */}
        <StyledList
          selectedIds={selectedItems}
          startSelectingItems={startSelecting}
          isSelectingItems={isSelecting}
          onItemSelect={toggleItem}
          onPress={redirectToUpdate}
          data={routines.filter((r) => r.folderIds.includes(folderId))}
          renderContent={(item) => <RoutineListItem item={item as Routine} />}
        />
      </TouchBlocker>

      <CreateButton onPress={() => setIsCreateDialogOpened(true)} />

      <RemoveRoutineDialog
        isOpen={isConfirmDialogOpened}
        onConfirm={onConfirm}
        onCancel={() => setIsConfirmDialogOpened(false)}
      />
      <ConfirmDialog
        isVisible={isCreateDialogOpened}
        onConfirm={() => {
          router.push(routes[option]);
          setIsCreateDialogOpened(false);
        }}
        onCancel={() => setIsCreateDialogOpened(false)}
        title="Select what you want to create"
        message={
          <ToggleOptions
            options={options}
            onChange={(option) => setOption(option as Option)}
          />
        }
        primaryButtonColor="primary"
        primaryButtonText="Create"
      />
      <NavModal
        isVisible={isNavModalOpened}
        onClose={() => setIsNavModalOpened(false)}
        title="Select folder"
        actions={navModalActions}
        CustomListItem={FolderListItem}
      />
    </ThemedView>
  );
};

export default RoutineList;

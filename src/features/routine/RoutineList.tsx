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

// TODO refactor it
const RoutineList: React.FC = () => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isCreateDialogOpened, setIsCreateDialogOpened] = useState(false);
  const router = useRouter();
  const pathName = usePathname();
  const [isConfirmDialogOpened, setIsConfirmDialogOpened] = useState(false);

  type Option = "folder" | "routine";
  const options: { label: string; value: Option }[] = [
    { label: "Folder", value: "folder" },
    { label: "Routine", value: "routine" },
  ];
  const [option, setOption] = useState(options[0].value);

  const { setIsOpen, setText } = useActionModalStore();
  const routines = useRoutineStore((state) => state.routines);
  const completeRoutines = useRoutineStore((state) => state.completeRoutines);

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
    routine: "/routines/create" as const,
    folder: "/folders/create" as const,
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

  useActionModal({
    actions: [removeAction, completeAction],
    onReset: resetSelection,
    isMenuAction: true,
    menuActions: [
      { label: "Add to folder", onPress: () => {} },
      { label: "Move to folder", onPress: () => {} },
    ],
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
          data={routines}
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
          router.push(routes[option] as any);
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
    </ThemedView>
  );
};

export default RoutineList;

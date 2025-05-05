import React, { useEffect, useRef, useState } from "react";
import { ThemedView } from "@/components/common/ThemedView";
import CreateButton from "@/components/common/CreateButton";
import { usePathname, useRouter } from "expo-router";
import { useRoutineStore } from "@/stores/routineStore";
import StyledList from "@/components/StyledList";
import { useActionModalStore } from "@/stores/actionsModalStore";
import TouchBlocker from "@/components/common/TouchBlocker";
import { RoutineListItem } from "@/components/routine/RoutineListItem";
import RoutineConfirmDialog from "@/components/routine/RoutineConfirmDialog";
import { ActionType } from "../types/actionModalTypes";
import { useActionDialog } from "@/hooks/useActionDialog";
import { useSelectableItems } from "@/hooks/useSelectableItems";
import { Routine } from "../types/routineTypes";

const Index = () => {
  const router = useRouter();
  const pathName = usePathname();
  // TODO REFACTOR IT
  const { setIsOpen, setText } = useActionModalStore();
  const data = useRoutineStore((state) => state.routines);

  const [isConfirmDialogOpened, setIsConfirmDialogOpened] = useState(false);

  const redirectToUpdate = (id: string) => {
    setIsRedirecting(true);
    router.push({ pathname: "/routines/update/[id]", params: { id } });
  };
  const [isRedirecting, setIsRedirecting] = useState(false);
  const {
    isSelecting,
    resetSelection,
    selectedItems,
    selectedItemsRef,
    startSelecting,
    toggleItem,
  } = useSelectableItems();
  // TODO move logic to component

  const removeRoutines = useRoutineStore((state) => state.removeRoutines);
  const completeRoutines = useRoutineStore((state) => state.completeRoutines);

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

  useActionDialog({
    actions: [removeAction, completeAction],
    onReset: resetSelection,
  });

  const onConfirm = () => {
    removeRoutines(selectedItems);
    setIsOpen(false);
    setIsConfirmDialogOpened(false);
    resetSelection();
  };

  // fixed redirecting issue
  useEffect(() => {
    if (pathName === "/") {
      // TODO
      setIsRedirecting(false);
    }
  }, [pathName]);

  // TODO refactore it
  useEffect(() => {
    selectedItemsRef.current = selectedItems;
  }, [selectedItems]);

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
          data={data}
          renderContent={(item) => <RoutineListItem item={item as Routine} />}
        />
      </TouchBlocker>

      <CreateButton onPress={() => router.push("/routines/create")} />

      <RoutineConfirmDialog
        isOpen={isConfirmDialogOpened}
        onConfirm={onConfirm}
        onCancel={() => setIsConfirmDialogOpened(false)}
      />
    </ThemedView>
  );
};

export default Index;

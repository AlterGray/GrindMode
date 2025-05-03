import React, { useEffect, useRef, useState } from "react";
import { ThemedView } from "@/components/ui/ThemedView";
import CreateButton from "@/components/CreateButton";
import { usePathname, useRouter } from "expo-router";
import { useRoutineStore } from "@/stores/routineStore";
import StyledList from "@/components/ui/StyledList/StyledList";
import { useActionModalStore } from "@/stores/actionsModalStore";
import TouchBlocker from "@/components/ui/TouchBlocker";
import { ItemComponent } from "@/components/routine/ListItemComponent";
import RoutineConfirmDialog from "@/components/routine/RoutineConfirmDialog";
import { ActionType } from "../types/actionModalTypes";
import { useActionDialog } from "@/hooks/useActionDialog";

const index = () => {
  const router = useRouter();
  const pathName = usePathname();
  // TODO REFACTOR IT
  const { isOpen, setIsOpen, setText } = useActionModalStore();
  const data = useRoutineStore((state) => state.routines);

  const [isConfirmDialogOpened, setIsConfirmDialogOpened] = useState(false);

  const redirectToUpdate = (id: string) => {
    setIsRedirecting(true);
    router.push({ pathname: "/routines/update/[id]", params: { id } });
  };
  const [isRedirecting, setIsRedirecting] = useState(false);

  const [selectedItems, setSelectedItems] = useState([] as string[]);
  const [isSelectingItems, setIsSelectingItems] = useState(false);
  // TODO move logic to component

  const selectItem = (id: string) => {
    let newItems = [] as string[];

    if (selectedItems.includes(id)) {
      newItems = selectedItems.filter((itemId) => itemId !== id);
    } else {
      newItems = [...selectedItems, id];
    }

    if (newItems.length === 0) {
      setIsSelectingItems(false);
      setIsOpen(false);
    }

    setSelectedItems(newItems);
    setText(newItems.length.toString());
  };

  const startSelectingItems = (id: string) => {
    if (isRedirecting) return;

    let newItems = [] as string[];

    setIsOpen(true);

    if (selectedItems.includes(id)) {
      newItems = selectedItems.filter((itemId) => itemId === id);
    } else {
      newItems = [...selectedItems, id];
    }

    setIsSelectingItems(true);
    setSelectedItems(newItems);
    setText(newItems.length.toString());
  };

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
      setSelectedItems([]);
    },
    iconName: "checkmark",
  };

  useActionDialog({
    actions: [removeAction, completeAction],
    onReset: () => {
      setSelectedItems([]);
      setIsSelectingItems(false);
    },
  });

  const onConfirm = () => {
    removeRoutines(selectedItems);
    setIsOpen(false);
    setIsConfirmDialogOpened(false);
    setSelectedItems([]);
  };

  // fixed redirecting issue
  useEffect(() => {
    if (pathName === "/") {
      // TODO
      setIsRedirecting(false);
    }
  }, [pathName]);

  // TODO refactore it
  const selectedItemsRef = useRef<string[]>([]);
  useEffect(() => {
    selectedItemsRef.current = selectedItems;
  }, [selectedItems]);

  return (
    <ThemedView className="flex-1 items-center justify-center">
      <TouchBlocker>
        <StyledList
          selectedItems={selectedItems}
          startSelectingItems={startSelectingItems}
          isSelectingItems={isSelectingItems}
          onSelectItem={selectItem}
          onPress={redirectToUpdate}
          data={data}
          itemComponent={(item) => <ItemComponent item={item} />}
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

export default index;

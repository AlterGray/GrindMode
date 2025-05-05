import { useActionModalStore } from "@ui/ActionsModal/actionsModalStore";
import { useState, useEffect, useRef } from "react";

export const useSelectableItems = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const selectedItemsRef = useRef<string[]>([]);
  const { setIsOpen } = useActionModalStore();

  useEffect(() => {
    selectedItemsRef.current = selectedItems;
  }, [selectedItems]);

  const startSelecting = (id: string) => {
    let newItems = selectedItems.includes(id)
      ? selectedItems.filter((itemId) => itemId === id)
      : [...selectedItems, id];

    setIsSelecting(true);
    setSelectedItems(newItems);
    setIsOpen(true);
  };

  const toggleItem = (id: string) => {
    let newItems = selectedItems.includes(id)
      ? selectedItems.filter((itemId) => itemId !== id)
      : [...selectedItems, id];

    setSelectedItems(newItems);
    if (newItems.length === 0) resetSelection();
  };

  const resetSelection = () => {
    setIsSelecting(false);
    setSelectedItems([]);
    setIsOpen(false);
  };

  return {
    selectedItems,
    isSelecting,
    startSelecting,
    toggleItem,
    resetSelection,
    selectedItemsRef,
  };
};

import { useState, useEffect, useRef } from "react";

export const useSelectableItems = (onClose: () => void) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const selectedItemsRef = useRef<string[]>([]);

  useEffect(() => {
    selectedItemsRef.current = selectedItems;
  }, [selectedItems]);

  const startSelecting = (id: string) => {
    let newItems = selectedItems.includes(id)
      ? selectedItems.filter((itemId) => itemId === id)
      : [...selectedItems, id];

    setIsSelecting(true);
    setSelectedItems(newItems);
  };

  const toggleItem = (id: string) => {
    let newItems = selectedItems.includes(id)
      ? selectedItems.filter((itemId) => itemId !== id)
      : [...selectedItems, id];

    setSelectedItems(newItems);
    if (newItems.length === 0) {
      onClose();
      resetSelection();
    }
  };

  const resetSelection = () => {
    setIsSelecting(false);
    setSelectedItems([]);
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

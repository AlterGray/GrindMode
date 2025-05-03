import { Pressable, View } from "react-native";
import React, { ReactNode } from "react";

type RoutineStatus = "done" | "undone" | "overdue";

type StyledItemProps = {
  isSelected: boolean;
  isSelectingItems: boolean;
  item: {
    id: string;
    status: RoutineStatus;
  };
  onLongPress?: (id: string) => void;
  onPress?: (id: string) => void;
  onSelectItem: (id: string) => void;
  children: ReactNode;
};

const StyledItem: React.FC<StyledItemProps> = ({
  item,
  isSelected,
  isSelectingItems,
  onLongPress,
  onPress,
  onSelectItem,
  children,
}) => {
  const statusClasses: Record<RoutineStatus, string> = {
    done: "bg-emerald-400 dark:bg-emerald-400",
    undone: "bg-light-listItemBorder dark:bg-dark-listItemBorder",
    overdue: "bg-orange-400 dark:bg-orange-400",
  };

  const selectedItemClasses =
    "bg-light-selectedListItemBackground dark:bg-dark-selectedListItemBackground";
  const unselectedItemClasses =
    "bg-light-listItemBackground dark:bg-dark-listItemBackground";
  const itemClasses = `p-4 ${isSelected ? selectedItemClasses : unselectedItemClasses}`;
  const borderClasses =
    "h-0.5 ml-16 " + (isSelected ? "bg-light-selectedListItemBorder" : "");
  const handlePress = () =>
    isSelectingItems ? onSelectItem(item.id) : onPress?.(item.id);

  // TODO review styles
  return (
    <View>
      <View className={`${borderClasses} ${statusClasses[item.status]}`} />
      <Pressable
        onLongPress={() => onLongPress?.(item.id)}
        onPress={handlePress}
        className={itemClasses}
      >
        {children}
      </Pressable>
    </View>
  );
};

export default StyledItem;

import React, { ReactNode } from "react";
import { Pressable, View } from "react-native";

type RoutineStatus = "done" | "undone" | "overdue";

type StyledItemProps = {
  isSelected: boolean;
  item: {
    id: string;
    status: RoutineStatus;
  };
  onLongPress?: () => void;
  onPress?: () => void;
  children: ReactNode;
};

// Top border color by status
const getStatusBorderClass = (status: RoutineStatus): string => {
  switch (status) {
    case "done":
      return "bg-light-statusDone dark:bg-dark-statusDone";
    case "undone":
      return "bg-light-statusUndone dark:bg-dark-statusUndone";
    case "overdue":
      return "bg-light-statusOverdue dark:bg-dark-statusOverdue";
    default:
      return "";
  }
};

// Background color by status and selection
const getStatusBackgroundClass = (
  status: RoutineStatus,
  isSelected: boolean,
): string => {
  if (isSelected)
    return "bg-light-selectedListItemBackground dark:bg-dark-selectedListItemBackground";

  switch (status) {
    case "done":
      return "bg-light-statusDoneBackground dark:bg-dark-statusDoneBackground";
    case "undone":
      return "bg-light-statusUndoneBackground dark:bg-dark-statusUndoneBackground";
    case "overdue":
      return "bg-light-statusOverdueBackground dark:bg-dark-statusOverdueBackground";
    default:
      return "bg-white dark:bg-black";
  }
};

const StyledItem: React.FC<StyledItemProps> = ({
  item,
  isSelected,
  onLongPress,
  onPress,
  children,
}) => {
  const borderClass = `h-0.5 ml-16 ${getStatusBorderClass(item.status)}`;
  const containerClass = `p-4 rounded-xl ${getStatusBackgroundClass(
    item.status,
    isSelected,
  )}`;

  return (
    <View className="overflow-hidden">
      <View className={borderClass} />
      <Pressable
        onLongPress={onLongPress}
        onPress={onPress}
        className={containerClass}
      >
        {children}
      </Pressable>
    </View>
  );
};

export default StyledItem;

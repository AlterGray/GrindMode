import React, { ReactNode } from "react";
import { Pressable, View } from "react-native";

import { RoutineStatuses } from "@shared/types/commonTypes";

type StyledItemProps = {
  isSelected: boolean;
  item: {
    id: string;
    status: RoutineStatuses;
  };
  onLongPress?: () => void;
  onPress?: () => void;
  children: ReactNode;
};

// Top border color by status
const getStatusBorderClass = (status: RoutineStatuses): string => {
  switch (status) {
    case RoutineStatuses.Done:
      return "bg-light-statusDone dark:bg-dark-statusDone";
    case RoutineStatuses.Undone:
      return "bg-light-statusUndone dark:bg-dark-statusUndone";
    case RoutineStatuses.Overdue:
      return "bg-light-statusOverdue dark:bg-dark-statusOverdue";
    default:
      return "";
  }
};

// Background color by status and selection
const getStatusBackgroundClass = (
  status: RoutineStatuses,
  isSelected: boolean,
): string => {
  if (isSelected)
    return "bg-light-selectedListItemBackground dark:bg-dark-selectedListItemBackground";

  switch (status) {
    case RoutineStatuses.Done:
      return "bg-light-statusDoneBackground dark:bg-dark-statusDoneBackground";
    case RoutineStatuses.Undone:
      return "bg-light-statusUndoneBackground dark:bg-dark-statusUndoneBackground";
    case RoutineStatuses.Overdue:
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

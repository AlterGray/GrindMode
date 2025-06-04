import React, { ReactNode } from "react";
import { Pressable, View } from "react-native";

import { RoutineStatuses } from "@shared/types/commonTypes";

type StyledItemProps = {
  item: {
    id: string;
    status: RoutineStatuses;
  };
  onLongPress?: () => void;
  onPress?: () => void;
  children: ReactNode;
};

const StyledItem: React.FC<StyledItemProps> = ({
  item,
  onLongPress,
  onPress,
  children,
}) => {
  // TODO set border color by parent?
  const borderBackgrounds: Record<RoutineStatuses, string> = {
    [RoutineStatuses.Undone]: "bg-light-statusUndone dark:bg-dark-statusUndone",
    [RoutineStatuses.Done]: "bg-light-success dark:bg-dark-done",
    [RoutineStatuses.Overdue]: "bg-light-warning dark:bg-dark-warning",
    [RoutineStatuses.Missed]: "bg-light-danger dark:bg-dark-danger",
  };
  const borderClass = `h-0.5 ml-16 ${borderBackgrounds[item.status]}`;

  return (
    <View className="overflow-hidden">
      <View className={borderClass} />
      <Pressable onLongPress={onLongPress} onPress={onPress}>
        {children}
      </Pressable>
    </View>
  );
};

export default StyledItem;

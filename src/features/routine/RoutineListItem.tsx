import React from "react";
import { View } from "react-native";

import { RoutineStatuses } from "@shared/types/commonTypes";
import ThemedText from "@shared/ui/ThemedText";

import PhaseBadge from "./PhaseBadge";
import RoutineStatus from "./RoutineStatus";
import { Routine } from "./routineTypes";

type ItemComponentProps = {
  item: Routine;
  isSelected: boolean;
};

// Background color by status and selection
const getStatusBackgroundClass = (
  status: RoutineStatuses,
  isSelected: boolean,
): string => {
  if (isSelected)
    return "bg-light-selectedListItemBackground dark:bg-dark-selectedListItemBackground";

  switch (status) {
    case RoutineStatuses.Undone:
      return "bg-light-statusUndoneBackground dark:bg-dark-statusUndoneBackground";
    case RoutineStatuses.Done:
      return "bg-light-statusDoneBackground dark:bg-dark-statusDoneBackground";
    case RoutineStatuses.Overdue:
      return "bg-light-statusOverdueBackground dark:bg-dark-statusOverdueBackground";
    case RoutineStatuses.Missed:
      return "bg-light-statusFailedBackground dark:bg-dark-statusFailedBackground";
  }
};

// TODO add better name for "item"
const RoutineListItem: React.FC<ItemComponentProps> = ({
  item,
  isSelected,
}) => {
  const formatedStartTime = new Date(item.startTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const bgColor = getStatusBackgroundClass(item.status, isSelected);

  // TODO adjust items height to all items have same height indeondent of content length
  return (
    <View className={`gap-2 p-4 ${bgColor}`}>
      <View className="gap-1">
        <View className="gap-2">
          <View className="flex-row w-full justify-between">
            <RoutineStatus status={item.status} />

            <ThemedText className="text-light-textAccent">
              Start at {formatedStartTime}
            </ThemedText>
          </View>

          <ThemedText className="text-lg">{item.title}</ThemedText>
        </View>
        {/* // TODO rename component */}
        <PhaseBadge routineId={item.id} />
      </View>
    </View>
  );
};

export default RoutineListItem;

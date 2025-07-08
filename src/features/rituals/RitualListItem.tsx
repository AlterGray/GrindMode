import React from "react";
import { View } from "react-native";

import { RitualStatuses } from "@shared/types/commonTypes";
import AnimatedThemedText from "@shared/ui/ThemedText";

import PhaseBadge from "./PhaseBadge";
import RitualStatus from "./RitualStatus";
import { Ritual } from "./ritualTypes";

type ItemComponentProps = {
  item: Ritual;
  isSelected: boolean;
};

// Background color by status and selection
const getStatusBackgroundClass = (
  status: RitualStatuses,
  isSelected: boolean,
): string => {
  if (isSelected)
    return "bg-light-selectedListItemBackground dark:bg-dark-selectedListItemBackground";

  switch (status) {
    case RitualStatuses.Undone:
      return "bg-light-statusUndoneBackground dark:bg-dark-statusUndoneBackground";
    case RitualStatuses.Done:
      return "bg-light-statusDoneBackground dark:bg-dark-statusDoneBackground";
    case RitualStatuses.Overdue:
      return "bg-light-statusOverdueBackground dark:bg-dark-statusOverdueBackground";
    case RitualStatuses.Missed:
      return "bg-light-statusFailedBackground dark:bg-dark-statusFailedBackground";
  }
};

// TODO add better name for "item"
const RitualListItem: React.FC<ItemComponentProps> = ({ item, isSelected }) => {
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
            <RitualStatus status={item.status} />

            <AnimatedThemedText color="accent">
              Start at {formatedStartTime}
            </AnimatedThemedText>
          </View>

          <AnimatedThemedText className="text-lg">
            {item.title}
          </AnimatedThemedText>
        </View>
        {/* // TODO rename component */}
        <PhaseBadge ritualId={item.id} />
      </View>
    </View>
  );
};

export default RitualListItem;

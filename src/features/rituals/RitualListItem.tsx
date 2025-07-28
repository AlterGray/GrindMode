import React from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";

import { useAnimatedColor } from "@shared/hooks/useAnimatedColor";
import { i18n } from "@shared/lib/i18n-js";
import { RitualStatuses } from "@shared/types/commonTypes";
import { ColorName } from "@shared/types/themeTypes";
import AnimatedThemedText from "@shared/ui/AnimatedThemedText";

import PhaseBadge from "./PhaseBadge";
import RitualStatus from "./RitualStatus";
import { Ritual } from "./ritualTypes";
import { isRitualActive } from "./utils";

type ItemComponentProps = {
  item: Ritual;
  isSelected: boolean;
};

// Background color by status and selection
const getStatusColors = (
  status: RitualStatuses,
  isSelected: boolean,
): { bgColor: ColorName; textColor: ColorName } => {
  if (isSelected)
    return { bgColor: "selectedListItemBackground", textColor: "textPrimary" };

  switch (status) {
    case RitualStatuses.Undone:
      return { bgColor: "statusUndoneBackground", textColor: "textPrimary" };
    case RitualStatuses.Done:
      return { bgColor: "statusDoneBackground", textColor: "textPrimary" };
    case RitualStatuses.Overdue:
      return { bgColor: "statusOverdueBackground", textColor: "textPrimary" };
    case RitualStatuses.Missed:
      return { bgColor: "statusFailedBackground", textColor: "textPrimary" };
  }
};

// TODO add better name for "item"
const RitualListItem: React.FC<ItemComponentProps> = ({ item, isSelected }) => {
  const formatedStartTime = new Date(item.startTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const { bgColor, textColor } = getStatusColors(item.status, isSelected);
  const animatedBgStyle = useAnimatedColor(bgColor);
  const animatedTextColor = useAnimatedColor(textColor, true);

  // TODO adjust items height to all items have same height indeondent of content length
  return (
    <Animated.View
      className={
        "gap-2 p-4 " + (!isRitualActive(item.days) ? "opacity-65" : "")
      }
      style={animatedBgStyle}
    >
      <View className="gap-1">
        <View className="gap-2">
          <View className="flex-row w-full justify-between">
            <RitualStatus key={item.status} status={item.status} />

            <Animated.Text style={animatedTextColor}>
              {item.isTimeBased
                ? `Start at ${formatedStartTime}`
                : i18n.t("noTimeLimits")}
            </Animated.Text>
          </View>

          <AnimatedThemedText className="text-lg">
            {item.title}
          </AnimatedThemedText>
        </View>
        {/* // TODO rename component */}
        <PhaseBadge ritualId={item.id} />
      </View>
    </Animated.View>
  );
};

export default RitualListItem;

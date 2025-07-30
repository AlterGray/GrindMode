import React, { memo, useMemo } from "react";
import Animated from "react-native-reanimated";

import { useAnimatedColor } from "@shared/hooks/useAnimatedColor";
import { RitualStatuses } from "@shared/types/commonTypes";
import { ColorName } from "@shared/types/themeTypes";

import RitualListItemContent from "./RitualListItem/RitualListItemContent";
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

const RitualListItem: React.FC<ItemComponentProps> = ({ item, isSelected }) => {
  const { bgColor, textColor } = useMemo(
    () => getStatusColors(item.status, isSelected),
    [item.status, isSelected],
  );

  const animatedBgStyle = useAnimatedColor(bgColor);
  const animatedTextColor = useAnimatedColor(textColor, true);

  return (
    <Animated.View
      className={
        "gap-2 p-4 " + (!isRitualActive(item.days) ? "opacity-65" : "")
      }
      style={animatedBgStyle}
    >
      <RitualListItemContent item={item} textColor={animatedTextColor} />
    </Animated.View>
  );
};

export default memo(RitualListItem);

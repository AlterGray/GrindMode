import React from "react";
import { Pressable } from "react-native";

import { DayItemType, DayType } from "@shared/types/commonTypes";
import AnimatedThemedText from "@shared/ui/AnimatedThemedText";

import { getStyle } from "./DaysPickerStyles";

// TODO REFACTOR THIS AND PARENT COMPONENT

// TODO during refactor create enums like for days
type DaysPickerItemProps = {
  day: { value: DayType; display: string };
  toggleDay: (day: DayItemType) => void;
  activeDays: DayType[];
  size: "small" | "regular";
};

const DaysPickerItem: React.FC<DaysPickerItemProps> = ({
  day,
  toggleDay,
  activeDays,
  size,
}) => {
  const isActive = activeDays.includes(day.value);
  const styles = getStyle(isActive, size);
  const textColor = isActive ? "secondary" : "muted";

  return (
    <Pressable
      accessibilityLabel={day.display}
      onPress={() => toggleDay(day)}
      className={styles + " dark:bg-dark-background"}
    >
      <AnimatedThemedText color={textColor}>{day.display}</AnimatedThemedText>
    </Pressable>
  );
};

export default DaysPickerItem;

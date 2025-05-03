import React from "react";
import { Pressable } from "react-native";
import { DayType } from "@/app/types/commonTypes";
import { ThemedText } from "../ThemedText";

// TODO REFACTOR THIS AND PARENT COMPONENT

// TODO during refactor create enums like for days
type DaysPickerProps = {
  day: { value: DayType; display: string };
  styles: string;
  onPress: () => void;
};

const DaysPickerItem: React.FC<DaysPickerProps> = ({
  day,
  styles,
  onPress,
}) => {
  return (
    <Pressable
      key={day.value}
      onPress={onPress}
      className={styles + " dark:bg-dark-background"}
    >
      <ThemedText color="secondary">{day.display}</ThemedText>
    </Pressable>
  );
};

export default DaysPickerItem;

import React from "react";
import { View } from "react-native";
import { DayType } from "@shared/types/commonTypes";
import { DAY_ITEMS_LIST } from "../../entities/days";
import DaysPickerItem from "./DaysPickerItem";
import { useControlledDays } from "@shared/hooks/useControlledDays";

type DaysPickerProps = {
  onChange: (days: DayType[]) => void;
  initialItems: DayType[];
  size?: "small" | "regular";
};

const DaysPicker: React.FC<DaysPickerProps> = ({
  onChange,
  initialItems,
  size = "regular",
}) => {
  const { toggleDay, activeDays } = useControlledDays({
    days: initialItems,
    onChange: (updated) => onChange(updated),
  });

  return (
    <View className="flex-row gap-4">
      {DAY_ITEMS_LIST.map((day) => {
        return (
          <DaysPickerItem
            key={day.value}
            day={day}
            size={size}
            toggleDay={toggleDay}
            activeDays={activeDays}
          />
        );
      })}
    </View>
  );
};

export default DaysPicker;

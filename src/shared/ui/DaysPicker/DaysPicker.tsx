import React from "react";
import { View } from "react-native";

import { DAY_ITEMS_LIST } from "@shared/entities/days";
import { useControlledDays } from "@shared/hooks/useControlledDays";
import { DayType } from "@shared/types/commonTypes";

import DaysPickerItem from "./DaysPickerItem";

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
    onChange: onChange,
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

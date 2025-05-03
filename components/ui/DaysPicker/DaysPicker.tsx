import React from "react";
import { View } from "react-native";
import { DayType, DayItemType } from "@/app/types/commonTypes";
import { DAY_ITEMS_LIST } from "@/constants/days";
import DaysPickerItem from "./DaysPickerItem";
import { useToggleDays } from "@/hooks/useToggleDays";
import { getStyle } from "./DaysPickerStyles";

type DaysPickerProps = {
  onChange: (days: DayType[]) => void;
  items?: DayType[];
  size?: "small" | "regular";
};

const DaysPicker: React.FC<DaysPickerProps> = ({
  onChange,
  items = DAY_ITEMS_LIST.map((d) => d.value),
  size = "regular",
}) => {
  const [toggleDay, activeDays] = useToggleDays(onChange, items);

  const isDayActive = (day: DayItemType) => {
    return activeDays.includes(day.value) && items.includes(day.value);
  };

  return (
    <View className="flex-row gap-2">
      {DAY_ITEMS_LIST.map((day) => {
        const isActive = isDayActive(day);
        const styles = getStyle(isActive, size);

        return (
          <DaysPickerItem
            key={day.value}
            day={day}
            styles={styles}
            onPress={() => toggleDay(day)}
          />
        );
      })}
    </View>
  );
};

export default DaysPicker;

import { useState } from "react";
import { DayItemType, DayType } from "@/app/types/commonTypes";
import { DAY_ITEMS_LIST } from "@/constants/days";

type toggleDayFn = (day: DayItemType) => void;
type useToggleDayResult = [toggleDayFn, DayType[]];

export const useToggleDays = (
  onChange: (items: DayType[]) => void,
  initialItems: DayType[],
): useToggleDayResult => {
  const [activeDays, setActiveDays] = useState<DayType[]>(
    initialItems.length ? initialItems : DAY_ITEMS_LIST.map((d) => d.value),
  );

  const toggleDay = (day: DayItemType) => {
    const isOnlyOneLeft = activeDays.length === 1;
    const isAlreadySelected = activeDays.includes(day.value);

    let updatedDays: DayType[];

    if (isOnlyOneLeft && isAlreadySelected) {
      updatedDays = activeDays; // keep as-is (optional: or empty array if desired)
    } else if (isAlreadySelected) {
      updatedDays = activeDays.filter((d) => d !== day.value);
    } else {
      updatedDays = [...activeDays, day.value];
    }

    setActiveDays(updatedDays);
    onChange(updatedDays);
  };

  return [toggleDay, activeDays];
};

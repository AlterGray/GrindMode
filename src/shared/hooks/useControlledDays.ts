import { useCallback, useState } from "react";

import { DayItemType, DayType } from "@shared/types/commonTypes";

type UseControlledDaysParams = {
  days: DayType[];
  onChange: (updated: DayType[]) => void;
};

// TODO remove onChange form hook
export const useControlledDays = ({
  days,
  onChange,
}: UseControlledDaysParams) => {
  const [activeDays, setActiveDays] = useState<DayType[]>(days);

  const toggleDay = useCallback(
    (day: DayItemType) => {
      const isOnlyOneLeft = activeDays.length === 1;
      const isAlreadySelected = activeDays.includes(day.value);

      if (isOnlyOneLeft && isAlreadySelected) return;

      const updated = isAlreadySelected
        ? activeDays.filter((d) => d !== day.value)
        : [...activeDays, day.value];

      setActiveDays(updated);
      onChange(updated);
    },
    [activeDays, onChange],
  );

  return { toggleDay, activeDays };
};

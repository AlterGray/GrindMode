import React, { useMemo } from "react";

import AnimatedThemedView from "@shared/ui/AnimatedThemedView";
import AnimatedThemedText from "@shared/ui/ThemedText";
import ThemedWheelPicker from "@shared/ui/ThemedWheelPicker";

import DurationPickerItem from "./DurationPickerItem";

type HoursPickerProps = {
  initialIndex?: number;
  onChange: (index: number) => void;
  maxHours?: number;
};

const HoursPicker: React.FC<HoursPickerProps> = ({
  initialIndex = 0,
  onChange,
  maxHours = 24,
}) => {
  const hours = useMemo(
    () => Array.from({ length: maxHours + 1 }, (_, i) => i),
    [maxHours],
  );

  return (
    <AnimatedThemedView className="flex-row items-center">
      <ThemedWheelPicker
        items={hours.map((h) => ({
          label: String(h).padStart(2, "0"),
          value: h,
        }))}
        onChange={({ index }) => onChange(index)}
        initialIndex={initialIndex}
        renderItem={(item) => <DurationPickerItem text={item.label} />}
      />
      <AnimatedThemedText className="ml-1 text-lg font-light">
        H
      </AnimatedThemedText>
    </AnimatedThemedView>
  );
};

export default HoursPicker;

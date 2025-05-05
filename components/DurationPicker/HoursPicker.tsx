import React, { useMemo } from "react";
import { ThemedView } from "../common/ThemedView";
import ThemedText from "../common/ThemedText";
import DurationPickerItem from "./DurationPickerItem";
import { ThemedWheelPicker } from "../common/ThemedWheelPicker";

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
    <ThemedView className="flex-row items-center">
      <ThemedWheelPicker
        items={hours.map((h) => ({
          label: String(h).padStart(2, "0"),
          value: h,
        }))}
        onChange={({ index }) => onChange(index)}
        initialIndex={initialIndex}
        renderItem={(item) => <DurationPickerItem text={item.label} />}
      />
      <ThemedText className="ml-1 text-lg font-light">H</ThemedText>
    </ThemedView>
  );
};

export default HoursPicker;

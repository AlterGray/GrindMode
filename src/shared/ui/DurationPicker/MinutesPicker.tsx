import React, { useMemo } from "react";

import AnimatedThemedView from "@shared/ui/AnimatedThemedView";
import AnimatedThemedText from "@shared/ui/ThemedText";
import ThemedWheelPicker from "@shared/ui/ThemedWheelPicker";

import DurationPickerItem from "./DurationPickerItem";

type MinutesPickerProps = {
  initialIndex?: number;
  maxMinutes?: number;
  onChange: (index: number) => void;
};

const MinutesPicker: React.FC<MinutesPickerProps> = ({
  initialIndex = 0,
  maxMinutes = 59,
  onChange,
}) => {
  const minutes = useMemo(
    () => Array.from({ length: maxMinutes + 1 }, (_, i) => i),
    [maxMinutes],
  );

  return (
    <AnimatedThemedView className="flex-row items-center">
      <ThemedWheelPicker
        items={minutes.map((h) => ({
          label: String(h).padStart(2, "0"),
          value: h,
        }))}
        onChange={({ index }) => onChange(index)}
        initialIndex={initialIndex}
        renderItem={(item) => <DurationPickerItem text={item.label} />}
      />
      <AnimatedThemedText className="ml-1 text-lg font-light">
        M
      </AnimatedThemedText>
    </AnimatedThemedView>
  );
};

export default MinutesPicker;

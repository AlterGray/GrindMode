import React from "react";

import DurationPickerButton from "@shared/ui/DurationPickerButton";
import ThemedText from "@shared/ui/ThemedText";
import ThemedView from "@shared/ui/ThemedView";
import TimePickerButton from "@shared/ui/TimePickerButton";

const TimeAndDurationSection = ({
  startTime,
  setStartTime,
  expectedDuration,
  setExpectedDuration,
}: {
  startTime: number;
  setStartTime: (val: number) => void;
  expectedDuration: number;
  setExpectedDuration: (val: number) => void;
}) => (
  <>
    <ThemedView className="flex-row items-center">
      <ThemedText>Start routine at:</ThemedText>
      <TimePickerButton time={startTime} onChange={setStartTime} />
    </ThemedView>

    <ThemedView className="flex-row items-center">
      <ThemedText>Routine duration:</ThemedText>
      <DurationPickerButton
        duration={expectedDuration}
        onChange={setExpectedDuration}
      />
    </ThemedView>
  </>
);

export default TimeAndDurationSection;

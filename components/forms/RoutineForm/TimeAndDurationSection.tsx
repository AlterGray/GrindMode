import DurationPickerButton from "@/components/common/buttons/DurationPickerButton";
import TimePickerButton from "@/components/common/buttons/TimePickerButton";
import ThemedText from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import React from "react";

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

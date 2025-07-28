import React from "react";

import { i18n } from "@shared/lib/utils/i18n/i18n-js";
import AnimatedThemedText from "@shared/ui/AnimatedThemedText";
import AnimatedThemedView from "@shared/ui/AnimatedThemedView";
import DurationPickerButton from "@shared/ui/DurationPickerButton";
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
    <AnimatedThemedView className="flex-row items-center">
      <AnimatedThemedText>{i18n.t("startRitualAt")}</AnimatedThemedText>
      <TimePickerButton time={startTime} onChange={setStartTime} />
    </AnimatedThemedView>

    <AnimatedThemedView className="flex-row items-center">
      <AnimatedThemedText>{i18n.t("ritualDuration")}</AnimatedThemedText>
      <DurationPickerButton
        duration={expectedDuration}
        onChange={setExpectedDuration}
      />
    </AnimatedThemedView>
  </>
);

export default TimeAndDurationSection;

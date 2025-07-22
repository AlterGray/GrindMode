import React, { useCallback } from "react";
import { ScrollView } from "react-native";

import { RitualFormValues } from "@features/rituals/ritualTypes";

import AnimatedThemedView from "@shared/ui/AnimatedThemedView";
import DaysGrid from "@shared/ui/DaysGrid";
import StyledButton from "@shared/ui/StyledButton";

import TimeAndDurationSection from "./TimeAndDurationSection";
import TitleSection from "./TitleSection";
import { useCreateUpdateForm } from "./useCreateUpdateForm";

type RitualFormProps = {
  initialValues: RitualFormValues;
  submitText: string;
  onSubmit: (newRitual: RitualFormValues) => void;
};

const CreateUpdateForm: React.FC<RitualFormProps> = ({
  submitText,
  initialValues,
  onSubmit,
}) => {
  const {
    state: { title, startTime, expectedDuration, days },
    setTitle,
    setStartTime,
    setExpectedDuration,
    setDays,
  } = useCreateUpdateForm(initialValues);

  const handleSubmit = useCallback(() => {
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      startTime,
      expectedDuration,
      days,
    });
  }, [title, startTime, expectedDuration, days, onSubmit]);

  return (
    <AnimatedThemedView className="flex-1">
      <ScrollView
        className="mx-2 flex-1 p-4"
        contentContainerStyle={{ gap: 8 }}
      >
        <TitleSection title={title} setTitle={setTitle} />

        <TimeAndDurationSection
          startTime={startTime}
          setStartTime={setStartTime}
          expectedDuration={expectedDuration}
          setExpectedDuration={setExpectedDuration}
        />

        <DaysGrid onChange={setDays} items={days} />

        <StyledButton
          title={submitText}
          onPress={handleSubmit}
          className="ml-auto mr-4 mt-2"
        />
      </ScrollView>
    </AnimatedThemedView>
  );
};

export default CreateUpdateForm;

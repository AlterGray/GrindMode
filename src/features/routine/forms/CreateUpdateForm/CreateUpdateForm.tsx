import React, { useCallback } from "react";
import { ScrollView } from "react-native";

import { RoutineFormValues } from "@features/routine/routineTypes";

import DaysGrid from "@shared/ui/DaysGrid";
import StyledButton from "@shared/ui/StyledButton";
import ThemedView from "@shared/ui/ThemedView";

import TimeAndDurationSection from "./TimeAndDurationSection";
import TitleDescriptionSection from "./TitleDescriptionSection";
import { useCreateUpdateForm } from "./useCreateUpdateForm";

type RoutineFormProps = {
  initialValues: RoutineFormValues;
  submitText: string;
  onSubmit: (newRoutine: RoutineFormValues) => void;
};

const CreateUpdateForm: React.FC<RoutineFormProps> = ({
  submitText,
  initialValues,
  onSubmit,
}) => {
  const {
    state: { title, description, startTime, expectedDuration, days },
    setTitle,
    setDescription,
    setStartTime,
    setExpectedDuration,
    setDays,
  } = useCreateUpdateForm(initialValues);

  const handleSubmit = useCallback(() => {
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      startTime,
      expectedDuration,
      days,
    });
  }, [title, description, startTime, expectedDuration, days, onSubmit]);

  return (
    <ThemedView className="flex-1">
      <ScrollView
        className="mx-2 flex-1 p-4"
        contentContainerStyle={{ gap: 8 }}
      >
        <TitleDescriptionSection
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
        />
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
    </ThemedView>
  );
};

export default CreateUpdateForm;

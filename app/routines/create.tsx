import React from "react";
import { useRouter } from "expo-router";
import { useRoutineStore } from "@features/routine/routineStore";
import CreateUpdateForm from "@features/routine/forms/CreateUpdateForm/CreateUpdateForm";
import { RoutineInput } from "@features/routine/routineTypes";
import { DayType } from "@shared/types/commonTypes";

const CreateRoutine: React.FC = () => {
  const router = useRouter();
  const addRoutine = useRoutineStore((state) => state.addRoutine);

  // TODO react hook form?
  // TODO need better VALIDATION
  const handleSubmit = (routine: RoutineInput) => {
    if (!routine.title.trim()) return;

    addRoutine({
      title: routine.title.trim(),
      description: routine.description.trim(),
      startTime: routine.startTime,
      expectedDuration: routine.expectedDuration,
      days: routine.days,
    });

    router.back();
  };

  const initialValues: RoutineInput = {
    title: "",
    description: "",
    startTime: Date.now(),
    expectedDuration: 0,
    days: [
      DayType.MONDAY,
      DayType.TUESDAY,
      DayType.WEDNESDAY,
      DayType.THURSDAY,
      DayType.FRIDAY,
      DayType.SATURDAY,
      DayType.SUNDAY,
    ],
  };

  return (
    <CreateUpdateForm
      initialValues={initialValues}
      submitText="Create routine"
      onSubmit={handleSubmit}
    />
  );
};

export default CreateRoutine;

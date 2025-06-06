import React from "react";

import { useRouter } from "expo-router";

import CreateUpdateForm from "@features/routine/forms/CreateUpdateForm/CreateUpdateForm";
import { createRoutine } from "@features/routine/lib/routineActions";
import { RoutineInput } from "@features/routine/routineTypes";

import { DayType } from "@shared/types/commonTypes";

const CreateRoutine: React.FC = () => {
  const router = useRouter();

  // TODO react hook form?
  // TODO need better VALIDATION
  const handleSubmit = (routine: RoutineInput) => {
    if (!routine.title.trim()) return;

    createRoutine(routine);

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

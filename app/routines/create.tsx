import React from "react";
import { useRouter } from "expo-router";
import { useRoutineStore } from "@/stores/routineStore";
import RoutineForm from "@/components/forms/RoutineForm/RoutineForm";
import { RoutineInput } from "../types/routineTypes";
import { DayType } from "../types/commonTypes";

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
    <RoutineForm
      initialValues={initialValues}
      submitText="Create routine"
      onSubmit={handleSubmit}
    />
  );
};

export default CreateRoutine;

import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRoutineStore } from "@features/routine/routineStore";
import CreateUpdateForm from "@features/routine/forms/CreateUpdateForm/CreateUpdateForm";
import { RoutineFormValues } from "@features/routine/routineTypes";

const EditRoutine: React.FC = () => {
  const router = useRouter();
  const updateRoutine = useRoutineStore((state) => state.updateRoutine);
  const { id } = useLocalSearchParams();
  const routineToEdit = useRoutineStore((state) =>
    state.routines.find((routine) => routine.id === id),
  );

  // TODO does it okay?
  if (!routineToEdit) {
    return null; // or show an error, loading, or fallback
  }

  // TODO react hook form?
  // TODO need better VALIDATION
  const handleSubmit = (routine: RoutineFormValues) => {
    if (!routine.title.trim()) return;

    updateRoutine({
      id: id as string, // TODO does it okay?
      title: routine.title.trim(),
      description: routine.description.trim(),
      startTime: routine.startTime,
      expectedDuration: routine.expectedDuration,
      days: routine.days,
      actualDuration: 0,
      folderIds: routineToEdit.folderIds,
    });

    router.back();
  };

  return (
    <CreateUpdateForm
      initialValues={routineToEdit}
      submitText="Edit routine"
      onSubmit={handleSubmit}
    />
  );
};

export default EditRoutine;

import React from "react";

import { useLocalSearchParams, useRouter } from "expo-router";

import CreateUpdateForm from "@features/rituals/forms/CreateUpdateForm/CreateUpdateForm";
import { useRitualStore } from "@features/rituals/ritualStore";
import { RitualFormValues } from "@features/rituals/ritualTypes";

const EditRitual: React.FC = () => {
  const router = useRouter();
  const updateRitual = useRitualStore((state) => state.updateRitual);
  const { id } = useLocalSearchParams();
  const ritualToEdit = useRitualStore((state) =>
    state.rituals.find((ritual) => ritual.id === id),
  );

  // TODO does it okay?
  if (!ritualToEdit) {
    return null; // or show an error, loading, or fallback
  }

  // TODO react hook form?
  // TODO need better VALIDATION
  const handleSubmit = (ritual: RitualFormValues) => {
    if (!ritual.title.trim()) return;

    updateRitual({
      id: id as string, // TODO does it okay?
      title: ritual.title.trim(),
      description: ritual.description.trim(),
      startTime: ritual.startTime,
      expectedDuration: ritual.expectedDuration,
      days: ritual.days,
      actualDuration: 0,
      folderIds: ritualToEdit.folderIds,
    });

    router.back();
  };

  return (
    <CreateUpdateForm
      initialValues={ritualToEdit}
      submitText="Edit ritual"
      onSubmit={handleSubmit}
    />
  );
};

export default EditRitual;

import React from "react";

import { useRouter } from "expo-router";

import CreateUpdateForm from "@features/rituals/forms/CreateUpdateForm/CreateUpdateForm";
import { createRitual } from "@features/rituals/lib/ritualActions";
import { RitualInput } from "@features/rituals/ritualTypes";

import { i18n } from "@shared/lib/i18n-js";
import { DayType } from "@shared/types/commonTypes";

const CreateRitual: React.FC = () => {
  const router = useRouter();

  // TODO react hook form?
  // TODO need better VALIDATION
  const handleSubmit = (ritual: RitualInput) => {
    if (!ritual.title.trim()) return;

    createRitual(ritual);

    router.back();
  };

  const initialValues: RitualInput = {
    title: "",
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
    isTimeBased: false,
  };

  return (
    <CreateUpdateForm
      initialValues={initialValues}
      submitText={i18n.t("createRitual")}
      onSubmit={handleSubmit}
    />
  );
};

export default CreateRitual;
